$('.spoiler').hide();
$('.spoilerButton').on('click', function () {
  $('.spoilerButton').hide();
  $('.spoiler').slideDown(1000);
});
$('.spoiler').on('click', function () {
  $('.spoiler').hide();
  $('.spoilerButton').fadeIn();
});

$('.spoiler2').hide();
$('.spoilerButton2').on('click', function () {
  $('.spoilerButton2').hide();
  $('.spoiler2').slideDown(1000);
});
$('.spoiler2').on('click', function () {
  $('.spoiler2').hide();
  $('.spoilerButton2').fadeIn();
});
