// uppercase

function toGeorgianUppercase(text) {
  const lower = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  const upper = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ'.toUpperCase();
  let result = '';
  for (let char of text) {
    const index = lower.indexOf(char);
    result += index !== -1 ? upper[index] : char;
  }
  return result;
}

document.querySelectorAll('.ge-uppercase').forEach(el => {
  el.textContent = toGeorgianUppercase(el.textContent);
});