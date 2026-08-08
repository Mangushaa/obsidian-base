### Creating Stream Sources

#### Creating Finite Streams

```
11: Stream<String> empty = Stream.empty(); // count = 0
12: Stream<Integer> singleElement = Stream.of(1); 
// count = 1
13: Stream<Integer> fromArray = Stream.of(1, 2, 3); // count = 3
```

#### Creating a Parallel Stream

```
24: var list = List.of("a", "b", "c");
25: Stream<String> fromListParallel = list.parallelStream();
```

#### Creating Infinite Streams

```
17: Stream<Double> randoms = Stream.generate(Math::random);
18: Stream<Integer> oddNumbers = Stream.iterate(1, n -> n + 2);
```

![[Pasted image 20260625225218.png]]

## Using Common Terminal Operations

![[Pasted image 20260625225345.png]]

## Counting

```
Stream<String> s = Stream.of("monkey", "gorilla", "bonobo");
System.out.println(s.count()); // 3
```

**NOTE:** For an infinite stream, it never terminates. 

## Finding the Minimum and Maximum

```
public Optional<T> min(Comparator<? super T> comparator)
public Optional<T> max(Comparator<? super T> comparator)


Stream<String> s = Stream.of("monkey", "ape", "bonobo");
Optional<String> min = s.min((s1, s2) -> s1.length() - s2.length());
min.ifPresent(System.out::println); // ape
```

When a stream contains multiple identical minimum values, `stream.min()` returns **only one** of them, wrapped in an `Optional`.

- **Primitives:** It simply returns the minimum number (e.g., `2`).
    
- **Objects:** It returns one of the tied object instances. In sequential streams, this is usually the first one encountered; in parallel streams, there is no guarantee which specific instance is returned.

## Finding a Value

```
public Optional<T> findAny()
public Optional<T> findFirst()
```

## Matching

```
public boolean anyMatch(Predicate <? super T> predicate)
public boolean allMatch(Predicate <? super T> predicate)
public boolean noneMatch(Predicate <? super T> predicate)


Stream<String> infinite = Stream.generate(() -> "chimp");
Predicate<String> pred = x -> Character.isLetter(x.charAt(0));
System.out.println(infinite.allMatch(pred)); // Never terminates
```

On an empty stream:

- `allMatch(...)` -> **`true`** (vacuous truth)
    
- `noneMatch(...)` -> **`true`** (there are no elements to match)
    
- `anyMatch(...)` -> **`false`** (you cannot find a match if there are no elements)

## Iterating

```
public void forEach(Consumer<? super T> action)
```

## Reducing

```
public T reduce(T identity, BinaryOperator<T> accumulator)
public Optional<T> reduce(BinaryOperator<T> accumulator)
public <U> U reduce(U identity,
BiFunction<U,? super T,U> accumulator,
BinaryOperator<U> combiner)
```

The third method signature is used when we are dealing with different types. It allows Java to create intermediate reductions and then combine them at the end. operation is useful when working with parallel streams because it allows the stream to be decomposed and reassembled by separate threads. For example, if we needed to count the length of four 100-character strings, the first two values and the last two values could be computed independently. The intermediate result (200 + 200) would then be combined into the final value.

## Collecting
The collect() method is a special type of reduction called a mutable reduction. It is more efficient than a regular reduction because we use the same mutable object while accumulating.

```
public <R> R collect(Supplier<R> supplier,
BiConsumer<R, ? super T> accumulator,
BiConsumer<R, R> combiner)

public <R,A> R collect(Collector<? super T, A,R> collector)

Stream<String> stream = Stream.of("w", "o", "l", "f");
StringBuilder word = stream.collect(
   StringBuilder::new,
   StringBuilder::append,
   StringBuilder::append);

System.out.println(word); // wolf
```

The first parameter is the supplier, which creates the object that will store the results as we
collect data.

The second parameter is the accumulator, which is a BiConsumer that takes two parameters and doesn’t return anything. It is responsible for adding one more element to the data collection. In this example, it appends the next String to the StringBuilder. 

The final parameter is the combiner, which is another BiConsumer. It is responsible for taking two data collections and merging them. This is useful when we are processing in parallel. 

```
Stream<String> stream = Stream.of("w", "o", "l", "f");

TreeSet<String> set = stream.collect(
   TreeSet::new,
   TreeSet::add,
   TreeSet::addAll);

System.out.println(set); // [f, l, o, w]
```

```
Stream<String> stream = Stream.of("w", "o", "l", "f");
TreeSet<String> set = stream.collect(
   Collectors.toCollection(TreeSet::new)
);

System.out.println(set); // [f, l, o, w]

------------------------------------------------

Stream<String> stream = Stream.of("w", "o", "l", "f");

Set<String> set = stream.collect(
   Collectors.toSet()
);

System.out.println(set); // [f, w, l, o]
```

## Concatenating Streams

```
var one = Stream.of("Bonobo");
var two = Stream.of("Mama Gorilla", "Baby Gorilla");
Stream.concat(one, two)
   .forEach(System.out::println);
```

**NOTE:** concat accepts only 2 params, not vararg;

## Sorting 

```
Stream<String> s = Stream.of("brown bear-", "grizzly-");
s.sorted(Comparator.reverseOrder())
   .forEach(System.out::print); // grizzly-brown bear-
   
--------------------------------------------------

Stream<String> s = Stream.of("brown bear-", "grizzly-");
s.sorted(Comparator::reverseOrder); // DOES NOT COMPILE
```

**NOTE:** ake a look at the second sorted() method signature again. It takes a Comparator, which is a functional interface that takes two parameters and returns an int. However, Comparator::reverseOrder doesn’t do that. Because reverseOrder() takes no arguments and returns a value, the method reference is equivalent to () -> Comparator.reverseOrder(), which is really a Supplier{Comparator}.


```
Stream.generate(() -> "Elsa")
.filter(n -> n.length() == 4)
.sorted()
.limit(2)
.forEach(System.out::println);
```

It hangs until you kill the program, or it throws an exception after running out of memory. The foreperson has instructed sorted() to wait until everything to sort is present. That never happens because there is an infinite stream.

## Working with Primitive Streams

- IntStream: Used for the primitive types int, short, byte, and char
- LongStream: Used for the primitive type long
- DoubleStream: Used for the primitive types double and float

```
Stream<Integer> stream = Stream.of(1, 2, 3);
System.out.println(stream.reduce(0, (s, n) -> s + n)); // 6


Stream<Integer> stream = Stream.of(1, 2, 3);
System.out.println(stream.mapToInt(x -> x).sum()); // 6
```

![[Pasted image 20260627224022.png]]

```
var fractions = DoubleStream.iterate(.5, d -> d / 2);
```

**NOTE:** In JAVA we can ommit 0 before '.' !!!!!!!

## Mapping Streams

![[Pasted image 20260627225636.png]]

![[Pasted image 20260627225814.png]]

```
var integerList = new ArrayList<Integer>();
IntStream ints = integerList.stream()
  .flatMapToInt(x -> IntStream.of(x));
DoubleStream doubles = integerList.stream()
  .flatMapToDouble(x -> DoubleStream.of(x));
LongStream longs = integerList.stream()
  .flatMapToLong(x -> LongStream.of(x));
```

```
private static Stream<Integer> mapping(IntStream stream) {
   return stream.mapToObj(x -> x);
}

private static Stream<Integer> boxing(IntStream stream) {
   return stream.boxed();
}
```

## Using Optional with Primitive Streams

```
var stream = IntStream.rangeClosed(1,10);
OptionalDouble optional = stream.average();
```

**NOTE:** The difference is that OptionalDouble is for a primitive and Optional{Double} is for the Double wrapper class. Working with the primitive optional class looks similar to working with the Optional class itself. The only noticeable difference is that we called getAsDouble() rather than get(). This makes it clear that we are working with a primitive. Also, orElseGet() takes a DoubleSupplier instead of a Supplier.

![[Pasted image 20260627230714.png]]

```
5: LongStream longs = LongStream.of(5, 10);
6: long sum = longs.sum();
7: System.out.println(sum); // 15
8: DoubleStream doubles = DoubleStream.generate(() -> Math.PI);
9: OptionalDouble min = doubles.min(); // runs infinitely
```

**NOTE:** LongStream.min, max, avarage - return optional, but sum returns value, I assume 0;

## Summarizing Statistics

Summary statistics include the following:

- getCount(): Returns a long representing the number of values.
- getAverage(): Returns a double representing the average. If the stream is empty, returns 0.0.
- getSum(): Returns the sum as a double for DoubleSummaryStatistics, and long for IntSummaryStatistics and LongSummaryStastistics.
- getMin(): Returns the smallest number (minimum) as a double, int, or long, depending on the type of the stream. If the stream is empty, returns the largest numeric value based on the type.
- getMax(): Returns the largest number (maximum) as a double, int, or long depending on the type of the stream. If the stream is empty, returns the smallest numeric value based on the type.

## Working with Advanced Stream Pipeline Concepts

```
25: var cats = new ArrayList<String>();
26: cats.add("Annie");
27: cats.add("Ripley");
28: var stream = cats.stream();
29: cats.add("KC");
30: System.out.println(stream.count());
```

**NOTE:** The correct answer is 3. Lines 25–27 create a List with two elements. Line 28 requests that a stream be created from that List. Remember that streams are lazily evaluated. This means the stream isn’t created on line 28. An object is created that knows where to look for the data when it is needed. On line 29, the List gets a new element. On line 30, the stream pipeline sees three elements when it runs giving us that count.

![[Pasted image 20260627231752.png]]


```
public static Optional<Integer> calculator(String text) {
// Calculation logic here
}


Optional<Integer> result = optional
.map(ChainingOptionals::calculator); // DOES NOT COMPILE 

// The problem is that calculator returns Optional<Integer>. The map() method adds another
Optional, giving us Optional<Optional<Integer>>. Well, that’s no good.

Optional<Integer> result = optional
.flatMap(ChainingOptionals::calculator);
```


## Checked Exceptions and Functional Interfaces

```
import java.io.*;
import java.util.*;
public class ExceptionCaseStudy {
   private static List<String> create() throws IOException {
      throw new IOException();
   }
}


public void good() throws IOException {
   ExceptionCaseStudy.create().stream().count();
}

public void bad() throws IOException {
   Supplier<List<String>> s = ExceptionCaseStudy::create; // DOES NOT COMPILE
}
```

Say what now? The problem is that the functional interface to which this method reference
expands does not declare an exception. The Supplier interface does not allow checked
exceptions.

There are two approaches to get around this problem. One is to catch the
exception and turn it into an unchecked exception.

```
public void ugly() {
   Supplier<List<String>> s = () -> {
      try {
         return ExceptionCaseStudy.create();
      } catch (IOException e) {
         throw new RuntimeException(e);
      }
   };
}
```

This works. But the code is ugly. One of the benefits of functional programming is that the
code is supposed to be easy to read and concise. Another alternative is to create a wrapper
method with try/catch.

```
private static List<String> createSafe() {
   try {
      return ExceptionCaseStudy.create();
   } catch (IOException e) {
      throw new RuntimeException(e);
   } 
}

// Now we can use the safe wrapper in our Supplier without issue.

public void wrapped() {
   Supplier<List<String>> s2 = ExceptionCaseStudy::createSafe;
}
```

## Collecting Results

![[Pasted image 20260627233205.png]]
![[Pasted image 20260627233340.png]]

## Using Basic Collectors

```
var ohMy = Stream.of("lions", "tigers", "bears");
String result = ohMy.collect(Collectors.joining(", "));
System.out.println(result); // lions, tigers, bears

------------------------------------------------------------------------------

var ohMy = Stream.of("lions", "tigers", "bears");
Double result = ohMy.collect(Collectors.averagingInt(String::length));
System.out.println(result); // 5.333333333333333

------------------------------------------------------------------------------

var ohMy = Stream.of("lions", "tigers", "bears");
TreeSet<String> result = ohMy
.filter(s -> s.startsWith("t"))
.collect(Collectors.toCollection(TreeSet::new));
System.out.println(result); // [tigers]

------------------------------------------------------------------------------

// Using toList()

One of the most common collectors is Collectors.toList(), which turns the result back
into a List. In fact, it is so common that there is a shortcut. Both of these do almost the
same thing:

Stream<String> ohMy1 = Stream.of("lions", "tigers", "bears");
List<String> mutableList = ohMy1.collect(Collectors.toList());


Stream<String> ohMy2 = Stream.of("lions", "tigers", "bears");
List<String> immutableList = ohMy2.toList();

While both return a List<String>, the contract is different. The Collectors.toList() gives you a mutable list that you can edit later. The shorter toList() does not allow changes. 

mutableList.add("zebras"); // No issues
immutableList.add("zebras"); // UnsupportedOperationException
```

## Collecting into Maps

```
var ohMy = Stream.of("lions", "tigers", "bears");
Map<String, Integer> map = ohMy.collect(
   Collectors.toMap(s -> s, String::length)
);

System.out.println(map); // {lions=5, bears=5, tigers=6}
```

**NOTE:** Returning the same value passed into a lambda is a common operation, so Java provides a method for it. You can rewrite s -> s as Function.identity(). It is not shorter and may or may not be clearer, so use your judgment about whether to use it.

```
var ohMy = Stream.of("lions", "tigers", "bears");
Map<Integer, String> map = ohMy.collect(Collectors.toMap(
   String::length,
   k -> k)
); // Exception in thread "main" java.lang.IllegalStateException:
Duplicate key 5 (attempted merging values lions and bears)

---------------------------------------------------------------

var ohMy = Stream.of("lions", "tigers", "bears");
Map<Integer, String> map = ohMy.collect(Collectors.toMap(
   String::length,
   k -> k,
   (s1, s2) -> s1 + "," + s2)
);

System.out.println(map); // {5=lions,bears, 6=tigers}

System.out.println(map.getClass()); // class java.util.HashMap

---------------------------------------------------------------

var ohMy = Stream.of("lions", "tigers", "bears");
TreeMap<Integer, String> map = ohMy.collect(Collectors.toMap(
   String::length,
   k -> k,
   (s1, s2) -> s1 + "," + s2,
   TreeMap::new)
);

System.out.println(map); // {5=lions,bears, 6=tigers}
System.out.println(map.getClass()); // class java.util.TreeMap
```

## Grouping, Partitioning, and Mapping

**NOTE:** Note that the function you call in groupingBy() cannot return null. It does not allow null keys.

```
var ohMy = Stream.of("lions", "tigers", "bears");
Map<Integer, Set<String>> map = 
ohMy.collect(
   Collectors.groupingBy(
      String::length,
      Collectors.toSet()
   )
);
System.out.println(map); // {5=[lions, bears], 6=[tigers]}

------------------------------------------------------------

var ohMy = Stream.of("lions", "tigers", "bears");
TreeMap<Integer, Set<String>> map = ohMy.collect(
   Collectors.groupingBy(
      String::length,
      TreeMap::new,
      Collectors.toSet()
   )
);
System.out.println(map); // {5=[lions, bears], 6=[tigers]}

------------------------------------------------------------

// Instead of using the downstream collector to specify the type, we can use any of the collectors
that we’ve already shown.

var ohMy = Stream.of("lions", "tigers", "bears");
Map<Integer, Long> map = ohMy.collect(
   Collectors.groupingBy(
      String::length,
      Collectors.counting()
   )
);
System.out.println(map); // {5=2, 6=1}

------------------------------------------------------------

var ohMy = Stream.of("lions", "tigers", "bears");
Map<Integer, Optional<Character>> map = ohMy.collect(
   Collectors.groupingBy(
      String::length,
      Collectors.mapping(
         s -> s.charAt(0),
         Collectors.minBy((a, b) -> a - b)
      )
    )
);
System.out.println(map); // {5=Optional[b], 6=Optional[t]}

```



## Partitioning

**NOTE:** Partitioning is a special case of grouping. With partitioning, there are only two possible groups: true and false. Partitioning is like splitting a list into two parts.

```
var ohMy = Stream.of("lions", "tigers", "bears");
Map<Boolean, List<String>> map = ohMy.collect(
   Collectors.partitioningBy(s -> s.length() <= 7));

System.out.println(map); // {false=[], true=[lions, tigers, bears]}
```

**NOTE:** Unlike groupingBy(), we cannot change the type of Map that is returned. However, there are only two keys in the map, so does it really matter which Map type we use?


## Teeing Collectors

```
record Separations(String spaceSeparated, String commaSeparated) {}


var list = List.of("x", "y", "z");
Separations result = list.stream()
.collect(Collectors.teeing(
   Collectors.joining(" "),
   Collectors.joining(","),
   (s, c) -> new Separations(s, c)
  )
);
System.out.println(result); // Separations[spaceSeparated=x y z, commaSeparated=x,y,z]
```

**NOTE:** There are three Collectors in this code. Two of them are for joining() and produce the values we want to return. The third is teeing(), which combines the results into the single object we want to return. This way, Java is happy because only one object is returned, and we are happy because we don’t have to go through the stream twice.

## Using a SplitIterator

![[Pasted image 20260628002920.png]]

```
12: var stream = List.of("bird-", "bunny-", "cat-", "dog-", "fish-", "lamb-",
13: "mouse-");
14: Spliterator<String> originalBagOfFood = stream.spliterator();
15: Spliterator<String> emmasBag = originalBagOfFood.trySplit();
16: emmasBag.forEachRemaining(System.out::print); // bird-bunny-cat-
17:
18: Spliterator<String> jillsBag = originalBagOfFood.trySplit();
19: jillsBag.tryAdvance(System.out::print); // dog-
20: jillsBag.forEachRemaining(System.out::print); // fish-
21:
22: originalBagOfFood.forEachRemaining(System.out::print); // lamb-mouse-
```


```
var originalBag = Stream.iterate(1, n -> ++n)
.spliterator();
Spliterator<Integer> newBag = originalBag.trySplit();
newBag.tryAdvance(System.out::print); // 1
newBag.tryAdvance(System.out::print); // 2
newBag.tryAdvance(System.out::print); // 3
```

**NOTE:** You might have noticed that this is an infinite stream. No problem! The Spliterator recognizes that the stream is infinite and doesn’t attempt to give you half. Instead, newBag contains a large number of elements. We get the first three since we call tryAdvance() three times. It would be a bad idea to call forEachRemaining() on an infinite stream!


**NOTE:** Java stream class implement autoclosable

```
@Override
@SuppressWarnings("unchecked")
public void close() {
    linkedOrConsumed = true;
    Runnable closeHandler = nextStage == null ? closeHandler : null; // simplified
    if (closeHandler != null) {
        closeHandler.run();
    }
}
```

By default, a stream is created without any `closeHandler`. Therefore, calling `close()` on a normal collection-based stream is a no-op (it does nothing) because there are no underlying resources to release.

Streams only need to be closed if they are backed by an underlying I/O resource that requires explicit closing. Examples include:

- `Files.lines(Path)`
    
- `Files.walk(Path)`
    
- `Files.list(Path)`

 You can actually add your own custom teardown logic to any stream using the `onClose` method. It returns the stream itself, allowing you to chain it:
```
try (Stream<String> stream = Stream.of("A", "B", "C")
        .onClose(() -> System.out.println("Stream is now closed!"))) {
    
    stream.forEach(System.out::println);
} // "Stream is now closed!" prints automatically here
```