function *main() {
  yield 1;
  yield 2;
  return 4;
}

const it = main()

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

