/*
 * Replaces Agenio's original contact-form.js (which posted to a PHP mailer we
 * don't have) with a Web3Forms submission, keeping the same jQuery pattern
 * and #contact-form / #form-messages hooks the template markup already uses.
 */
(function ($) {
  "use strict";
  var form = $("#contact-form");
  var formMessages = $("#form-messages");

  $(form).on("submit", function (e) {
    e.preventDefault();

    if (!form[0].reportValidity()) return;

    var submitBtn = form.find('button[type="submit"]');
    submitBtn.prop("disabled", true);
    formMessages.removeClass("error success").text("Enviando...");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form[0]),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          formMessages.removeClass("error").addClass("success").text("Solicitud enviada. Te respondemos por correo.");
          form[0].reset();
        } else {
          throw new Error(data.message || "Error desconocido");
        }
      })
      .catch(function () {
        var fallback = form.data("fallback-email") || "";
        formMessages.removeClass("success").addClass("error").text("No se pudo enviar. Intenta de nuevo o escríbenos a " + fallback + ".");
      })
      .finally(function () {
        submitBtn.prop("disabled", false);
      });
  });
})(jQuery);
