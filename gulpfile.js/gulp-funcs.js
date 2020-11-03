const gutil = require('gulp-util');
const through = require('through2');

const jsonfile = require('jsonfile');




const global_done_color = 'bgRed';
const are_watching = 'Watching';
const bar_width = 40;

function namedColoredBar (gulp_type, local_text_color, is_watching) {
  const emtpy_line = ' '.repeat(bar_width);
  if (is_watching) {
    var finish_mess = gulp_type + ' ' + are_watching;
  } else {
    var finish_mess = gulp_type;
  }
  const type_length = bar_width - finish_mess.length;
  const short_bar = ' '.repeat(type_length);
  const type_line = short_bar + finish_mess;

  const empty_color = gutil.colors[local_text_color](emtpy_line);
  const type_color = gutil.colors[local_text_color](type_line);

  const done = gutil.colors[global_done_color](short_bar);
  const mess = gutil.colors[local_text_color](finish_mess);
  const finished_color = done + mess;
  return {
    empty_color: empty_color,
    type_color: type_color,
    finished_color: finished_color
  };
}

const coloredBars = function (gulp_type, local_text_color, is_watching) {
  const { empty_color, type_color, finished_color } = namedColoredBar(
    gulp_type,
    local_text_color,
    is_watching
  );

  const startMess = function () {
    console.log(empty_color);
    console.log(empty_color);
    console.log(empty_color);
    console.log(type_color);
    console.log(empty_color);
    console.log(empty_color);
    console.log(empty_color);
  };

  const stopMess = function () {
    console.log(empty_color);
    console.log(finished_color);
  };

  return { startMess: startMess, stopMess: stopMess };
};

const printFile = function (gulp_type) {
  const showFilename = function (file, enc, cb) {
    return through.obj(function (file, enc, cb) {
      console.log(gulp_type, file.path);
      cb(null, file);
    });
  };
  return showFilename;
};

const writeJsonFile = function (file_name) {
  const funcWriteJson = function (json_obj) {
    jsonfile.writeFile(file_name, json_obj, function (err) {
      if (err) console.error(err);
    });
  };
  return funcWriteJson;
};

module.exports = {
  coloredBars: coloredBars,
  printFile: printFile,
  writeJsonFile: writeJsonFile
};
