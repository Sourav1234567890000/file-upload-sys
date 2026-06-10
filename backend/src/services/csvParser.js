const csvParser = (file) => {
  // convert buffer into string
  const bufferConvert = file.buffer.toString("utf-8");
  console.log(bufferConvert);

  //   split string  ->   rows array

  let rowArray = [];
  rowArray = bufferConvert.split("\n");

  const cleanRow = rowArray.filter((row) => {
    if (row !== "") {
      return true;
    } else {
      return false;
    }
  });

  console.log(cleanRow);

  // split header
  const header = cleanRow[0];
  const splitHeaderColumn = header.split(",");
  console.log(splitHeaderColumn);

  //  Map rows -> objects
  let obj = {};

  let row;
  let values;
  let totalCredit = 0;
  for (let i = 1; i < cleanRow.length; i++) {
    row = cleanRow[i];
    values = row.split(",");
    totalCredit += +values[2];
  }
  console.log("totalCredit : " + totalCredit);

  return totalCredit;
};

module.exports = csvParser;
