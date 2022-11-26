import Web3Modal from "web3modal";
import { providers } from "ethers";

export const getProviderOrSigner = async (web3ModalRef, needSigner = false) => {
    console.log("Here!");
    web3ModalRef.current = new Web3Modal({
      network: "mumbai",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };