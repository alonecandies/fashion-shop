export default class FormatStringData {

  public formatStrinVi(text: string) {
    return text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

  public formatHexaToString(text: string) {
    return text.replace(/[\u{0080}-\u{FFFF}]/gu, "");
  }

  public cleanStringVi(input) {
    var output = "";
    for (var i = 0; i < input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
        output += input.charAt(i);
      }
    }
    return output;
  }

}