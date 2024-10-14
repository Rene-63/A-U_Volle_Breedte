// ==UserScript==
// @name        AAO Button Volle Breite
// @namespace   bos-ernie.leitstellenspiel.de
// @version     1.0.0
// @license     BSD-3-Clause
// @author      BOS-Ernie (voor NL aangepast door Rene-MKS)
// @description Past de breedte aan van de A&U links, zodat het allemaal wat overzichtelijker wordt
// @match       https://www.meldkamerspel.com/aaos
// @match       https://www.meldkamerspel.com/missions/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @run-at      document-idle
// @grant       none
// @resource    https://forum.leitstellenspiel.de/index.php?thread/27088-script-aao-button-volle-breite/
// @downloadURL https://github.com/Rene-63/A-U_Volle_Breedte/blob/main/A-U_Volle_Breedte.users.js
// @updateURL   https://github.com/Rene-63/A-U_Volle_Breedte/blob/main/A-U_Volle_Breedte.users.js
// ==/UserScript==

(function () {
  // Wähle alle relevanten Links aus
  const links = document.querySelectorAll(".aao_btn, .btn-group.aao_btn_group a");
  let timerActive = false;

  links.forEach(link => {
    const parentColumn = link.closest(".col-sm-2");
    const isInColumn = parentColumn && parentColumn.className.startsWith("col-");

    // Skip elements outside of the expected columns
    if (!isInColumn) {
      return;
    }

    // Apply width and styling for button links
    if (link.classList.contains("aao_btn")) {
      link.style.minWidth = "100%";
      link.style.textAlign = "left";
      link.style.display = "flex";
      link.style.alignItems = "center";
      link.style.width = "100%";
      link.style.boxSizing = "border-box";
      link.style.margin = "0";

      const iconElement = link.querySelector("span.label");
      const timerElement = link.querySelector(".aao_timer");

      if (iconElement) {
        iconElement.style.marginRight = "5px";
      }

      if (timerElement) {
        timerActive = true;
        const timerContainer = document.createElement("span");
        timerContainer.style.marginLeft = "auto";
        timerContainer.appendChild(timerElement);
        link.appendChild(timerContainer);
      }
    } else if (link.closest(".btn-group.aao_btn_group")) {
      const parentButtonGroup = link.closest(".btn-group.aao_btn_group");
      link.style.minWidth = "90%";
      link.style.textAlign = "left";
      parentButtonGroup.style.width = "100%";
      parentButtonGroup.style.margin = "0";
    }
  });

  // Verstecke <br>-Elemente, wenn Timer aktiv sind
  if (timerActive) {
    const brElements = document.querySelectorAll("#mission-aao-group br");
    brElements.forEach(br => {
      br.style.display = "none";
    });
  }
})();
