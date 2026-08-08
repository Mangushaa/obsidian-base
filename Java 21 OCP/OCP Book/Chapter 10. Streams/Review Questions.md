### 1. What could be the output of the following?

Java

```
var stream = Stream.iterate("", (s) -> s + "1");
System.out.println(stream.limit(2).map(x -> x + "2"));
```

- [ ] A. 12112
    
- [ ] B. 212
    
- [ ] C. 212112
    
- [ ] D. java.util.stream.ReferencePipeline$3@4517d9a3
    
- [ ] E. The code does not compile.
    
- [ ] F. An exception is thrown.
    
- [ ] G. The code hangs.
    

### 2. What could be the output of the following?

Java

```
Predicate<String> predicate = s -> s.startsWith("g");
var stream1 = Stream.generate(() -> "growl!");
var stream2 = Stream.generate(() -> "growl!");
var b1 = stream1.anyMatch(predicate);
var b2 = stream2.allMatch(predicate);
System.out.println(b1 + " " + b2);
```

- [ ] A. true false
    
- [ ] B. true true
    
- [ ] C. java.util.stream.ReferencePipeline$3@4517d9a3
    
- [ ] D. The code does not compile.
    
- [ ] E. An exception is thrown.
    
- [ ] F. The code hangs.
    

### 3. What could be the output of the following?

Java

```
Predicate<String> predicate = s -> s.length() > 3;
var stream = Stream.iterate("-", s -> ! s.isEmpty(), (s) -> s + s);
var b1 = stream.noneMatch(predicate);
var b2 = stream.anyMatch(predicate);
System.out.println(b1 + " " + b2);
```

- [ ] A. false false
    
- [ ] B. false true
    
- [ ] C. java.util.stream.ReferencePipeline$3@4517d9a3
    
- [ ] D. The code does not compile.
    
- [ ] E. An exception is thrown.
    
- [ ] F. The code hangs.
    

### 4. Which are true statements about terminal operations in a stream that runs successfully? (Choose all that apply.)

- [ ] A. At most one terminal operation can exist in a stream pipeline.
    
- [ ] B. Terminal operations are a required part of the stream pipeline in order to get a result.
    
- [ ] C. Terminal operations have Stream as the return type.
    
- [ ] D. The peek() method is an example of a terminal operation.
    
- [ ] E. The referenced Stream may be used after calling a terminal operation.
    

### 5. Which of the following sets result to 8.0? (Choose all that apply.)

- [ ] A.
    

Java

```
double result = LongStream.of(6L, 8L, 10L)
.mapToInt(x -> (int) x)
.collect(Collectors.groupingBy(x -> x))
.keySet()
.stream()
.collect(Collectors.averagingInt(x -> x));
```

- [ ] B.
    

Java

```
double result = LongStream.of(6L, 8L, 10L)
.mapToInt(x -> x)
.boxed()
.collect(Collectors.groupingBy(x -> x))
.keySet()
.stream()
.collect(Collectors.averagingInt(x -> x));
```

- [ ] C.
    

Java

```
double result = LongStream.of(6L, 8L, 10L)
.mapToInt(x -> (int) x)
.boxed()
.collect(Collectors.groupingBy(x -> x))
.keySet()
.stream()
.collect(Collectors.averagingInt(x -> x));
```

- [ ] D.
    

Java

```
double result = LongStream.of(6L, 8L, 10L)
.mapToInt(x -> (int) x)
.collect(Collectors.groupingBy(x -> x, Collectors.toSet()))
.keySet()
.stream()
.collect(Collectors.averagingInt(x -> x));
```

- [ ] E.
    

Java

```
double result = LongStream.of(6L, 8L, 10L)
.mapToInt(x -> x)
.boxed()
.collect(Collectors.groupingBy(x -> x, Collectors.toSet()))
.keySet()
.stream()
.collect(Collectors.averagingInt(x -> x));
```

- [ ] F.
    

Java

```
double result = LongStream.of(6L, 8L, 10L)
.mapToInt(x -> (int) x)
.boxed()
.collect(Collectors.groupingBy(x -> x, Collectors.toSet()))
.keySet()
.stream()
.collect(Collectors.averagingInt(x -> x));
```

### 6. Which of the following methods can fill in the blank so that the code prints out false?

Java

```
var s = Stream.generate(() -> "meow");
var match = s.__________(String::isEmpty);
System.out.println(match);
```

- [ ] A. Only allMatch
    
- [ ] B. Only anyMatch
    
- [ ] C. Only noneMatch
    
- [ ] D. Both allMatch and anyMatch
    
- [ ] E. Both allMatch and noneMatch
    
- [ ] F. None of the above
    

### 7. We have a method that returns a sorted list without changing the original. We want to rewrite it. Which of the following pairs can fill in the blanks in refactored() to do the same with streams?

Java

```
private static List<String> sort(List<String> list) {
    var copy = new ArrayList<String>(list);
    Collections.sort(copy, (a, b) -> b.compareTo(a));
    return copy;
}

private static List<String> refactored(List<String> list) {
    return list.stream()
        ._______((a, b) -> b.compareTo(a))
        .__________;
}
```

- [ ] A. compare and toList()
    
- [ ] B. compare and sort()
    
- [ ] C. compareTo and toList()
    
- [ ] D. compareTo and sort()
    
- [ ] E. sorted and collect()
    
- [ ] F. sorted and collect(Collectors.toList())
    

### 8. Which of the following are true given this declaration? (Choose all that apply.)

Java

```
var is = IntStream.empty();
```

- [ ] A. is.average() returns the type int.
    
- [ ] B. is.average() returns the type OptionalInt.
    
- [ ] C. is.findAny() returns the type int.
    
- [ ] D. is.findAny() returns the type OptionalInt.
    
- [ ] E. is.sum() returns the type int.
    
- [ ] F. is.sum() returns the type OptionalInt.
    

### 9. Which of the following can we add after line 6 for the code to run without error and not produce any output? (Choose all that apply.)

Java

```
4: var stream = LongStream.of(1, 2, 3);
5: var opt = stream.map(n -> n * 10)
6: .filter(n -> n < 5).findFirst();
```

- [ ] A.
    

Java

```
if (opt.isPresent())
System.out.println(opt.get());
```

- [ ] B.
    

Java

```
if (opt.isPresent())
System.out.println(opt.getAsLong());
```

- [ ] C.
    

Java

```
opt.ifPresent(System.out.println);
```

- [ ] D.
    

Java

```
opt.ifPresent(System.out::println);
```

- [ ] E. None of these; the code does not compile.
    
- [ ] F. None of these; line 6 throws an exception at runtime.
    

### 10. Given the four statements (L, M, N, O), select the order that would cause the code to output 10 lines.

Java

```
Stream.generate(() -> "1")
L: .filter(x -> x.length() > 1)
M: .forEach(System.out::println)
N: .limit(10)
O: .peek(System.out::println)
;
```

- [ ] A. L, N
    
- [ ] B. L, N, O
    
- [ ] C. L, N, M
    
- [ ] D. L, N, M, O
    
- [ ] E. L, O, M
    
- [ ] F. N, M
    
- [ ] G. N, O
    

### 11. What changes need to be made together for this code to print the string 12345? (Choose all that apply.)

Java

```
Stream.iterate(1, x -> x++)
.limit(5).map(x -> x)
.collect(Collectors.joining());
```

- [ ] A. Changing Collectors.joining() to Collectors.joining(",")
    
- [ ] B. Changing map(x -> x) to map(x -> "" + x)
    
- [ ] C. Changing x -> x++ to x -> ++x
    
- [ ] D. Adding .forEach(System.out::print) after the call to collect()
    
- [ ] E. Wrapping the entire line in a System.out.print statement
    
- [ ] F. None of the above; the code already prints 12345
    

### 12. Which is true of the following code?

Java

```
Set<String> birds = Set.of("oriole", "flamingo");
Stream.concat(birds.stream(), birds.stream(), birds.stream())
.sorted() // line X
.distinct()
.findAny()
.ifPresent(System.out::println);
```

- [ ] A. It is guaranteed to print flamingo as is and when line X is removed.
    
- [ ] B. It is guaranteed to print oriole as is and when line X is removed.
    
- [ ] C. It is guaranteed to print flamingo as is, but not when line X is removed.
    
- [ ] D. It is guaranteed to print oriole as is, but not when line X is removed.
    
- [ ] E. The output may vary as is.
    
- [ ] F. The code does not compile.
    
- [ ] G. It throws an exception because the same list is used as the source for multiple streams.
    

### 13. Which of the following is true?

Java

```
List<Integer> x1 = List.of(1, 2, 3);
List<Integer> x2 = List.of(4, 5, 6);
List<Integer> x3 = List.of();
Stream.of(x1, x2, x3).map(x -> x + 1)
.flatMap(x -> x.stream())
.forEach(System.out::print);
```

- [ ] A. The code compiles and prints 123456.
    
- [ ] B. The code compiles and prints 234567.
    
- [ ] C. The code compiles but does not print anything.
    
- [ ] D. The code compiles but prints stream references.
    
- [ ] E. The code runs infinitely.
    
- [ ] F. The code does not compile.
    
- [ ] G. The code throws an exception.
    

### 14. Which of the following are true? (Choose all that apply.)

Java

```
4: Stream<Integer> s = Stream.of(1);
5: IntStream is = s.boxed();
6: DoubleStream ds = s.mapToDouble(x -> x);
7: Stream<Integer> s2 = ds.mapToInt(x -> x);
8: s2.forEach(System.out::print);
```

- [ ] A. Line 4 causes a compiler error.
    
- [ ] B. Line 5 causes a compiler error.
    
- [ ] C. Line 6 causes a compiler error.
    
- [ ] D. Line 7 causes a compiler error.
    
- [ ] E. Line 8 causes a compiler error.
    
- [ ] F. The code compiles but throws an exception at runtime.
    
- [ ] G. The code compiles and prints 1.
    

### 15. Given the generic type String, the partitioningBy() collector creates a Map<Boolean, List> when passed to collect() by default. When a downstream collector is passed to partitioningBy(), which return types can be created? (Choose all that apply.)

- [ ] A. Map<boolean, List>
    
- [ ] B. Map<Boolean, List>
    
- [ ] C. Map<Boolean, Map>
    
- [ ] D. Map<Boolean, Set>
    
- [ ] E. Map<Long, TreeSet>
    
- [ ] F. None of the above
    

### 16. Which of the following statements are true about this code? (Choose all that apply.)

Java

```
20: Predicate<String> empty = String::isEmpty;
21: Predicate<String> notEmpty = empty.negate();
22:
23: var result = Stream.generate(() -> "")
24: .limit(10)
25: .filter(notEmpty)
26: .collect(Collectors.groupingBy(k -> k))
27: .entrySet()
28: .stream()
29: .map(Entry::getValue)
30: .flatMap(Collection::stream)
31: .collect(Collectors.partitioningBy(notEmpty));
32: System.out.println(result);
```

- [ ] A. It outputs {}.
    
- [ ] B. It outputs {false=[], true=[]}.
    
- [ ] C. If we changed line 31 from partitioningBy(notEmpty) to groupingBy(n -> n), it would output {}.
    
- [ ] D. If we changed line 31 from partitioningBy(notEmpty) to groupingBy(n -> n), it would output {false=[], true=[]}.
    
- [ ] E. The code does not compile.
    
- [ ] F. The code compiles but does not terminate at runtime.
    

### 17. What is the result of the following?

Java

```
var s = DoubleStream.of(1.2, 2.4);
s.peek(System.out::println).filter(x -> x > 2).count();
```

- [ ] A. 1
    
- [ ] B. 2
    
- [ ] C. 2.4
    
- [ ] D. 1.2 and 2.4
    
- [ ] E. There is no output.
    
- [ ] F. The code does not compile.
    
- [ ] G. An exception is thrown.
    

### 18. What is the output of the following?

Java

```
11: public class Paging {
12: record Sesame(String name, boolean human) {
13: @Override public String toString() {
14: return name();
15: }
16: }
17: record Page(List<Sesame> list, long count) {}
18:
19: public static void main(String[] args) {
20: var monsters = Stream.of(new Sesame("Elmo", false));
21: var people = Stream.of(new Sesame("Abby", true));
22: printPage(monsters, people);
23: }
24:
25: private static void printPage(Stream<Sesame> monsters,
26: Stream<Sesame> people) {
27: Page page = Stream.concat(monsters, people)
28: .collect(Collectors.teeing(
29: Collectors.filtering(s -> s.name().startsWith("E"),
30: Collectors.toList()),
31: Collectors.counting(),
32: (l, c) -> new Page(l, c)));
33: System.out.println(page);
34: } }
```

- [ ] A. Page[list=[Abby], count=1]
    
- [ ] B. Page[list=[Abby], count=2]
    
- [ ] C. Page[list=[Elmo], count=1]
    
- [ ] D. Page[list=[Elmo], count=2]
    
- [ ] E. The code does not compile due to Stream.concat().
    
- [ ] F. The code does not compile due to Collectors.teeing().
    
- [ ] G. The code does not compile for another reason.
    

### 19. What is the simplest way of rewriting this code?

Java

```
List<Integer> x = IntStream.range(1, 6)
.mapToObj(i -> i)
.collect(Collectors.toList());
x.forEach(System.out::println);
```

- [ ] A.
    

Java

```
IntStream.range(1, 6);
```

- [ ] B.
    

Java

```
IntStream.range(1, 6)
.forEach(System.out::println);
```

- [ ] C.
    

Java

```
IntStream.range(1, 6)
.mapToObj(i -> i)
.forEach(System.out::println);
```

- [ ] D. None of the above is equivalent.
    
- [ ] E. The provided code does not compile.
    

### 20. Which of the following throw an exception when an Optional is empty? (Choose all that apply.)

- [ ] A. opt.orElse("");
    
- [ ] B. opt.orElseGet(() -> "");
    
- [ ] C. opt.orElseThrow();
    
- [ ] D. opt.orElseThrow(() -> throw new Exception());
    
- [ ] E. opt.orElseThrow(RuntimeException::new);
    
- [ ] F. opt.get();
    
- [ ] G. opt.get("");
    

### 21. What is the output of the following?

Java

```
var spliterator = Stream.generate(() -> "x")
.spliterator();
spliterator.tryAdvance(System.out::print);
var split = spliterator.trySplit();
split.tryAdvance(System.out::print);
```

- [ ] A. x
    
- [ ] B. xx
    
- [ ] C. A long list of x’s.
    
- [ ] D. There is no output.
    
- [ ] E. The code does not compile.
    
- [ ] F. The code compiles but does not terminate at runtime.