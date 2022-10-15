import Popup from "./Popup.js";
import { popupImage, popupCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
  }
}
