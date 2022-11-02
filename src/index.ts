import { DIALOG_CLASS_NAME } from "./core/constants";
import "./index.css";

const handleOpenDialog = async (
  message = "Are you sure you want to continue?"
) => {
  const portal = document.body;
  return new Promise((resolve) => {
    const template = document.createElement("div");
    template.className = "portal";
    template.innerHTML = `<div class="dialog-box">
    <p>${message}</p>
    <button id="dialog-box-yes">Yes</button
    ><button id="dialog-box-cancel">Cancel</button>
  </div>
  `;
    portal.appendChild(template);

    const yesButtonHandler = document.getElementById("dialog-box-yes");
    const cancelButtonHandler = document.getElementById("dialog-box-cancel");

    yesButtonHandler!.addEventListener("click", () => {
      resolve("yes");
    });
    cancelButtonHandler!.addEventListener("click", () => {
      resolve("cancel");
    });
  }).then((result) => {
    portal.removeChild(document.getElementsByClassName("portal")[0]);
    return result;
  });
};

const main = async () => {
  const dialogListeners = document.getElementsByClassName(DIALOG_CLASS_NAME);

  dialogListeners[0].addEventListener("click", async () => {
    const result = await handleOpenDialog();

    let resultMessage = 'You just clicked "yes"';
    if (result === "cancel") {
      resultMessage = `You just clicked "Cancel"`;
    }

    document.getElementById("result")!.innerHTML = resultMessage;
  });
};

main();
