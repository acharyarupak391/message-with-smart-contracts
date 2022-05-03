#!/bin/bash

if [ -e .env ]
then
    if grep -q REACT_APP_CONTRACT_ADDRESS .env
    then
        contract_address=$(grep REACT_APP_CONTRACT_ADDRESS .env | cut -d '=' -f2)
    fi
    
    if grep -q REACT_APP_ETHEREUM_NETWORK .env
    then
        ethereum_network=$(grep REACT_APP_ETHEREUM_NETWORK .env | cut -d '=' -f2)
    fi

    if grep -q REACT_APP_SUBGRAPH_SLUG .env
    then
        subgraph_slug=$(grep REACT_APP_SUBGRAPH_SLUG .env | cut -d '=' -f2)
    fi
else
    if [[ -z "${REACT_APP_CONTRACT_ADDRESS}" ]]; then
      echo "REACT_APP_CONTRACT_ADDRESS env variable not found"
    else
      contract_address="${REACT_APP_CONTRACT_ADDRESS}"
    fi
        
    if [[ -z "${REACT_APP_ETHEREUM_NETWORK}" ]]; then
      echo "REACT_APP_ETHEREUM_NETWORK env variable not found"
    else
      ethereum_network="${REACT_APP_ETHEREUM_NETWORK}"
    fi
    
    if [[ -z "${REACT_APP_SUBGRAPH_SLUG}" ]]; then
      echo "REACT_APP_SUBGRAPH_SLUG env variable not found"
    else
      subgraph_slug="${REACT_APP_SUBGRAPH_SLUG}"
    fi

fi

abi_path="./src/ABI/Message.json"
# echo "${contract_address} ${ethereum_network} ${abi_path} ${subgraph_slug}"

graph init \
  --product hosted-service \
  --from-contract ${contract_address} \
  --network ${ethereum_network} \
  --abi ${abi_path} \
  ${subgraph_slug}