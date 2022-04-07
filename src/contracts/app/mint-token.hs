{-# LANGUAGE OverloadedStrings #-}

module Main where

import Control.Exception (throwIO)
import Data.String (IsString (..))
import Ledger.Address (Address)
import Network.HTTP.Req
import PAB (TokenContracts (..))
import System.Environment (getArgs)
import Text.Printf (printf)
import Token.OffChain (TokenParams (..))
import Utils (contractActivationArgs, unsafeReadAddress, unsafeReadWalletId)
import Wallet.Emulator.Wallet (WalletId (..))
import Wallet.Types (ContractInstanceId (..))

address :: Address
address = unsafeReadAddress "addr_test1qrrswgu70f8wuhdqnk7tk52dla2c7peuukvlvmu0e338m4w5qqhj89csyv7y7543l24hz8t00rrgyct2p5gv3udgtpxqprzavs"

namiAddress :: Address
namiAddress = unsafeReadAddress "addr_test1qz5gr43kn7nnzdmastvqdkx7kgr8s7qjnf0zm7tvyhj6prjr4fq3q7yn6tgmx08xxq390qyu7asdf2qlngrhghts8uysdfed6a"

wid :: WalletId
wid = unsafeReadWalletId "8c8c14997236e9372520d26666fb581e9b639ccb"

namiWid :: WalletId
namiWid = unsafeReadWalletId "3345524abf6bbe1809449224b5972c41790b6cf2"

main :: IO ()
main = do
  [amt', tn', wid', addr'] <- getArgs
  let wid = unsafeReadWalletId wid'
      tp =
        TokenParams
          { tpToken = fromString tn',
            tpAmount = read amt',
            tpAddress = unsafeReadAddress addr'
          }
  printf "minting token for wallet id %s with parameters %s\n" (show wid) $ show tp
  cid <- mintToken wid tp
  printf "minted tokens, contract instance id: %s\n" $ show cid

mintStatic :: IO ()
mintStatic = do
  let amt' = "500"
      tn' = "ChariTea"
      wid' = wid
      addr' = address
      tp =
        TokenParams
          { tpToken = fromString tn',
            tpAmount = read amt',
            tpAddress = addr'
          }

  printf "minting token for wallet id %s with parameters %s\n" (show wid) $ show tp
  cid <- mintToken wid tp
  printf "minted tokens, contract instance id: %s\n" $ show cid

mintNami :: IO ()
mintNami = do
  let amt' = "7"
      tn' = "NAMI-7"
      wid' = namiWid
      addr' = namiAddress
      tp =
        TokenParams
          { tpToken = fromString tn',
            tpAmount = read amt',
            tpAddress = addr'
          }

  printf "minting token for wallet id %s with parameters %s\n" (show namiWid) $ show tp
  cid <- mintToken namiWid tp
  printf "minted tokens, contract instance id: %s\n" $ show cid

mintToken :: WalletId -> TokenParams -> IO ContractInstanceId
mintToken wid tp = do
  v <-
    runReq defaultHttpConfig $
      req
        POST
        (http "127.0.0.1" /: "api" /: "contract" /: "activate")
        (ReqBodyJson $ contractActivationArgs wid $ Mint tp)
        jsonResponse
        (port 9080)
  let c = responseStatusCode v
  if c == 200
    then return $ responseBody v
    else throwIO $ userError $ printf "ERROR: %d\n" c
