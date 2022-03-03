import { worker } from "./mocks/browser";
import { getItem, setItem, clear } from "localforage";
import db from "./initial.json";

function DevTool(url: string) {
  if (url) {
    worker.start({
      onUnhandledRequest: "bypass",
    });
    worker.printHandlers();
    CheckInitial(db);
  }
}

/**
 * check is the db initialed
 */
async function CheckInitial(db: any) {
  try {
    let initial = await getItem("initial");
    if (!initial) {
      await InitialDB(db);
    }
  } catch (error) {
    console.log("initial DB error: " + error);
  }
}

/**
 * initial db from json data
 */
async function InitialDB(db: any) {
  await clear();
  await setItem("initial", true);
  for (const item of Object.keys(db)) {
    await setItem(item, db[item]);
  }
}

export default DevTool;
