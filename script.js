$(document).ready(function () {
  $("body").on("click", ".item-increase", function () {
    const temp = parseInt($(this).prev().val());
    $(this)
      .prev()
      .val(temp + 1);
    adjustTotal(this);
    updateTotal();
  });

  $("body").on("click", ".item-decrease", function () {
    const temp = parseInt($(this).next().val());
    if (temp > 0) {
      $(this)
        .next()
        .val(temp - 1);
      adjustTotal(this);
      updateTotal();
    }
  });

  $("body").on("input", ".item-qty", function () {
    this.value = this.value
      .replace(/[^0-9]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    adjustTotal(this);
    updateTotal();
  });

  $("body").on("click", ".item-remove", function () {
    $(this).parent().parent().remove();
    updateTotal();
  });

  $(".new-item-price").on("input", function () {
    this.value = this.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
  });

  $(".new-item-add").on("click", function () {
    if ($(".new-item-name").val() && $(".new-item-price").val()) {
      $(".item-list").append(
        $("<div/>", { class: "row mt-2 item" })
          .append(
            $("<div/>", {
              class: "col-3 item-name",
              text: $(".new-item-name").val(),
            })
          )
          .append(
            $("<div/>", {
              class: "col item-price",
              text: $(".new-item-price").val(),
            })
          )
          .append(
            $("<div/>", { class: "col-3 input-group" })
              .append(
                $("<button/>", {
                  class: "btn btn-outline-secondary item-decrease",
                  type: "button",
                  text: "-",
                })
              )
              .append(
                $("<input />", {
                  class: "qty text-center item-qty",
                  type: "text",
                  value: "0",
                })
              )
              .append(
                $("<button/>", {
                  class: "btn btn-outline-secondary item-increase",
                  type: "button",
                  text: "+",
                })
              )
          )
          .append(
            $("<div />", { class: "col-2" }).append(
              $("<button />", {
                class: "btn btn-danger item-remove",
                text: "remove",
              })
            )
          )
          .append(
            $("<div />", { class: "col-2", text: "$ " }).append(
              $("<span />", { class: "item-total", text: "0" })
            )
          )
      );
      $(".new-item-name").val("");
      $(".new-item-price").val("");
    }
  }); // End of new item add
}); //End of DOM ready

function adjustTotal(button) {
  const qty = parseInt($(button).parent().children("input").val());
  const price = parseFloat(
    $(button).parent().parent().children(".item-price").text()
  );
  $(button)
    .parent()
    .parent()
    .children()
    .last()
    .children("span")
    .text((qty * price).toFixed(2));
}

function updateTotal() {
  const totalList = [];

  $("span.item-total").each(function () {
    totalList.push(parseFloat($(this).text()));
  });
  if (totalList.length > 0) {
    let total = totalList.reduce(function (acc, val) {
      return (acc += val);
    }, 0);
    $(".total-amt").text(total.toFixed(2));
  } else {
    $(".total-amt").text("0.00");
  }
}
