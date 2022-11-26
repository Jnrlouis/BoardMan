import { ABI, CONTRACT_ADDRESS } from "../../constants";
import { Contract } from "ethers";

export const getBoardManContractInstance = (providerOrSigner) => {
    return new Contract(
      CONTRACT_ADDRESS,
      ABI,
      providerOrSigner
    );
};