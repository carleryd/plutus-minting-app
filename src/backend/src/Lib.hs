{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-}

module Lib where

import Blockfrost.API ()
import Blockfrost.Client
  ( Address (Address),
    Amount,
    Block,
    BlockfrostError (..),
    getAddressDetails,
    getAddressUtxos,
    getLatestBlock,
    projectFromFile,
    runBlockfrost,
  )
import Blockfrost.Lens hiding (port)
import Blockfrost.Types.Cardano.Addresses (AddressUtxo)
import Control.Exception (throwIO)
import qualified Control.Lens as Lens
import Control.Monad (when)
import Data.Aeson (FromJSON (..), ToJSON (..))
import Data.Text (pack, unpack)
import qualified Data.Text
import GHC.Generics
import Network.HTTP.Req
import PAB (TokenContracts (..))
import Plutus.PAB.Events.ContractInstanceState (PartiallyDecodedResponse (..))
import Plutus.PAB.Webserver.Types (ContractInstanceClientState (..))
import qualified System.Directory
import Text.Printf (printf)
import Utils (contractActivationArgs, unsafeReadAddress, unsafeReadWalletId)
import Wallet.Emulator.Wallet (WalletId (..))

w1Address :: Address
w1Address =
  Address $
    Data.Text.pack
      "addr_test1qplfk3cw70jwlq7gya2m0mrx6fxujrf6gm9v9c556j75v5k5qqhj89csyv7y7543l24hz8t00rrgyct2p5gv3udgtpxqy637fp"

w2Address :: Address
w2Address =
  Address $
    Data.Text.pack
      "addr_test1qp2ay4yk83x2hyv63y794klajtj08w2kawk2vyc4adpu5urd8fkz57x5aymr2xvfqqg4drzw384cx0jnqmt6d4vdwfeq934a74"

printAddressUtxos :: [AddressUtxo] -> [IO ()]
printAddressUtxos utxos =
  printedAmounts
  where
    xss :: [[Amount]]
    xss = (Lens.^. amount) <$> utxos

    printAmount :: Amount -> IO ()
    printAmount x = print $ "Amount: " ++ show x

    printedAmounts = (\amounts -> print "Utxo: " <> mconcat (printAmount <$> amounts)) <$> xss

data WalletBalances = WalletBalances
  { w1 :: [AddressUtxo],
    w2 :: [AddressUtxo]
  }
  deriving (Show, Generic)

instance ToJSON WalletBalances

instance FromJSON WalletBalances

-- getMonitorState :: ContractInstanceId -> IO (ContractInstanceClientState TokenContracts)
-- getMonitorState cid = do
--   v <-
--     runReq defaultHttpConfig $
--       req
--         GET
--         (http "127.0.0.1" /: "api" /: "contract" /: "instance" /: pack (cidToString cid) /: "status")
--         NoReqBody
--         jsonResponse
--         (port 9080)
--   let c = responseStatusCode v
--   when (c /= 200) $
--     throwIO $ userError $ printf "ERROR: %d\n" c
--   return $ responseBody v

cardanoServicesIP :: Data.Text.Text
cardanoServicesIP = "192.168.1.103"

getWalletInfo :: String -> IO String
getWalletInfo _wid = do
  let wid = unsafeReadWalletId _wid
  v <-
    runReq defaultHttpConfig $
      req
        GET
        ( http cardanoServicesIP
            /: "v2"
            /: "wallets"
            /: pack _wid
        )
        NoReqBody
        jsonResponse
        (port 8090)

  let c = responseStatusCode v
  when (c /= 200) $
    throwIO $
      userError $
        printf
          "ERROR: %d\n"
          c

  let x :: ContractInstanceClientState TokenContracts
      x = responseBody v

  return "HELLO"

getBlockfrostUtxos :: IO WalletBalances
getBlockfrostUtxos = do
  currentDir <- System.Directory.getCurrentDirectory
  testnet <- projectFromFile (currentDir <> "/.blockfrost-testnet-token")

  let c1 = getAddressUtxos w1Address
      c2 = getAddressUtxos w2Address

  w1UtxosResult <- runBlockfrost testnet c1
  w2UtxosResult <- runBlockfrost testnet c2

  _ <- case w1UtxosResult of
    Left e -> print $ "Error: " <> show e
    Right a -> print $ "Success utxo: " <> show a

  let w1Utxos = w1UtxosResult Lens.^. Lens._Right
      w2Utxos = w2UtxosResult Lens.^. Lens._Right

  return $ WalletBalances w1Utxos w2Utxos
