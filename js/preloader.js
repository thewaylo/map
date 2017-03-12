function hidePrelodaer() {
    $('.myloader').remove();

}
function showPreloader() {//call after defining body tag

    $("body").append(`
      <div class="container myloader">
    <div class="row">
      <div class="col-xs-2 col-md-2"></div>
      <div class="col-xs-8 col-md-8">
        <center>
          <div class="loader"> </div>
        </center>
      </div>
      <div class="col-xs-2 col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <center>
          <h3 class="loader-text">plotting map locations</h3>
        </center>
      </div>
    </div>
</div>
    `);
    $('.myloader').on('mousewheel touchmove', function (e) {
        e.preventDefault();
    });
}