const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const INDEX_NICELIST_NAME_FOR_CALC_PROOF = 30;
const LEAF = niceList[30];
const merkleTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  try {
    const root = merkleTree.getRoot();
    const proof = merkleTree.getProof(INDEX_NICELIST_NAME_FOR_CALC_PROOF);
    console.log("root", root);
    console.log("LEAF:", LEAF);
    console.log(
      `Proof generated for niceList[${INDEX_NICELIST_NAME_FOR_CALC_PROOF}]:`,
      niceList[INDEX_NICELIST_NAME_FOR_CALC_PROOF]
    );

    const body = {
      proof,
      leaf: LEAF,
    };
    const { data: gift } = await axios.post(`${serverUrl}/gift`, body);

    console.log({ gift });
  } catch (error) {
    console.log("In catch block logging error.message:", error.message);
  }
}

main();
