### Question 1

Suppose you need to display a collection of products for sale, which may contain duplicates. Additionally, you have a collection of sales that you need to track, sorted by the natural order of the sale ID, and you need to retrieve the text of each. Which two of the following classes best suit your needs for each of these scenarios? (Choose two.)

- [ ] 1. `ArrayList`
    
- [ ] 2. `HashMap`
    
- [ ] 3. `HashSet`
    
- [ ] 4. `LinkedList`
    
- [ ] 5. `SequencedTreeSet`
    
- [ ] 6. `TreeMap`
    

### Question 2

Which of the following are true? (Choose all that apply.)

Java

```
12: List<?> q = List.of("mouse", "parrot");
13: var v = List.of("mouse", "parrot");
14:
15: q.removeIf(String::isEmpty);
16: q.removeIf(s -> s.length() == 4);
17: v.removeIf(String::isEmpty);
18: v.removeIf(s -> s.length() == 4);
```

- [ ] 1. This code compiles and runs without error.
    
- [ ] 2. Exactly one of these lines contains a compiler error.
    
- [ ] 3. Exactly two of these lines contain a compiler error.
    
- [ ] 4. Exactly three of these lines contain a compiler error.
    
- [ ] 5. Exactly four of these lines contain a compiler error.
    
- [ ] 6. If any lines with compiler errors are removed, this code runs without throwing an exception.
    
- [ ] 7. If any lines with compiler errors are removed, this code throws an exception.
    

### Question 3

What is the result of the following statements?

Java

```
3: var greetings = new ArrayDeque<String>();
4: greetings.offerLast("hello");
5: greetings.offerLast("hi");
6: greetings.offerFirst("ola");
7: greetings.pop();
8: greetings.peek();
9: while (greetings.peek() != null)
10:     System.out.print(greetings.pop());
```

- [ ] 1. hello
    
- [ ] 2. hellohi
    
- [ ] 3. hellohiola
    
- [ ] 4. hiola
    
- [ ] 5. The code does not compile.
    
- [ ] 6. An exception is thrown.
    

### Question 4

Which of these statements compile? (Choose all that apply.)

- [ ] 1. `` `HashSet<Number> hs = new HashSet<Integer>();` ``
    
- [ ] 2. `` `HashSet<? super ClassCastException> set = new HashSet<Exception>();` ``
    
- [ ] 3. `` `List<> list = new ArrayList<String>();` ``
    
- [ ] 4. `` `List<Object> values = new HashSet<Object>();` ``
    
- [ ] 5. `` `List<Object> objects = new ArrayList<? extends Object>();` ``
    
- [ ] 6. `` `Map<String, ? extends Number> hm = new HashMap<String, Integer>();` ``
    

### Question 5

What is the result of the following code?

Java

```
1: public record Hello<T>(T t) {
2:     public Hello(T t) { this.t = t; }
3:     private <T> void println(T message) {
4:         System.out.print(t + "-" + message);
5:     }
6:     public static void main(String[] args) {
7:         new Hello<String>("hi").println(1);
8:         new Hello("hola").println(true);
9:     } 
10: }
```

- [ ] 1. hi followed by a runtime exception.
    
- [ ] 2. hi-1hola-true
    
- [ ] 3. The first compiler error is on line 1.
    
- [ ] 4. The first compiler error is on line 3.
    
- [ ] 5. The first compiler error is on line 8.
    
- [ ] 6. The first compiler error is on another line.
    

### Question 6

Which of the following can fill in the blank to print `[7, 5, 3]`? (Choose all that apply.)

Java

```
8: public record Platypus(String name, int beakLength) {
9:     @Override public String toString() {return "" + beakLength;}
10: 
11:     public static void main(String[] args) {
12:         Platypus p1 = new Platypus("Paula", 3);
13:         Platypus p2 = new Platypus("Peter", 5);
14:         Platypus p3 = new Platypus("Peter", 7);
15: 
16:         List<Platypus> list = Arrays.asList(p1, p2, p3);
17: 
18:         Collections.sort(list, Comparator.comparing_______________);
19: 
20:         System.out.println(list);
21:     }
22: }
```

- [ ] 1. `(Platypus::beakLength)`
    
- [ ] 2. `` `(Platypus::beakLength).reversed()` ``
    
- [ ] 3. `` `(Platypus::name).thenComparing(Platypus::beakLength)` ``
    
- [ ] 4. `` `(Platypus::name).thenComparing(Comparator.comparing(Platypus::beakLength).reversed())` ``
    
- [ ] 5. `` `(Platypus::name).thenComparingNumber(Platypus::beakLength).reversed()` ``
    
- [ ] 6. `` `(Platypus::name).thenComparingInt(Platypus::beakLength).reversed()` ``
    

### Question 7

Which of the following method signatures are valid overrides of the `hairy()` method in the `Alpaca` class? (Choose all that apply.)

Java

```
import java.util.*;
public class Alpaca {
    public List<String> hairy(List<String> list) { return null; }
}
```

- [ ] 1. `` `public List<String> hairy(List<CharSequence> list) { return null; }` ``
    
- [ ] 2. `` `public List<String> hairy(List<String> list) { return null; }` ``
    
- [ ] 3. `` `public List<String> hairy(List<Integer> list) { return null; }` ``
    
- [ ] 4. `` `public List<CharSequence> hairy(List<String> list) { return null; }` ``
    
- [ ] 5. `` `public Object hairy(List<String> list) { return null; }` ``
    
- [ ] 6. `` `public ArrayList<String> hairy(List<String> list) { return null; }` ``
    

### Question 8

Which of the following fills in the blank, allowing the code to compile and run without issue?

Java

```
11: SequencedCollection<String> animals = new _____________<>();
12: animals.addFirst("lions");
13: animals.addLast("tigers");
14: for(var a : animals)
15:     System.out.println(a);
16: System.out.println(animals.get(0));
```

- [ ] 1. `HashSet`
    
- [ ] 2. `LinkedList`
    
- [ ] 3. `TreeSetMap`
    
- [ ] 4. `HashMap`
    
- [ ] 5. None of the above
    

### Question 9

What is the result of the following program?

Java

```
3: public class MyComparator implements Comparator<String> {
4:     public int compare(String a, String b) {
5:         return b.toLowerCase().compareTo(a.toLowerCase());
6:     }
7:     public static void main(String[] args) {
8:         String[] values = { "123", "Abb", "aab" };
9:         Arrays.sort(values, new MyComparator());
10:        for (var s: values)
11:            System.out.print(s + " ");
12:     }
13: }
```

- [ ] 1. Abb aab 123
    
- [ ] 2. aab Abb 123
    
- [ ] 3. 123 Abb aab
    
- [ ] 4. 123 aab Abb
    
- [ ] 5. The code does not compile.
    
- [ ] 6. A runtime exception is thrown.
    

### Question 10

Which of these statements can fill in the blank so that the `Helper` class compiles successfully? (Choose all that apply.)

Java

```
2: public class Helper {
3:     public static <U extends Exception>
4:     void printException(U u) {
5:         
6:         System.out.println(u.getMessage());
7:     }
8:     public static void main(String[] args) {
9:         Helper.____________________________________________;
10:    } 
11: }
```

- [ ] 1. `` `printException(new FileNotFoundException("A"))` ``
    
- [ ] 2. `` `printException(new Exception("B"))` ``
    
- [ ] 3. `` `<Throwable>printException(new Exception("C"))` ``
    
- [ ] 4. `` `<NullPointerException>printException(new NullPointerException ("D"))` ``
    
- [ ] 5. `` `printException(new Throwable("E"))` ``
    

### Question 11

Which of the following will compile when filling in the blank? (Choose all that apply.)

Java

```
var list = List.of(1, 2, 3);
var set = Set.of(1, 2, 3);
var map = Map.of(1, 2, 3, 4);
____________.forEach(System.out::println);
```

- [ ] 1. `list`
    
- [ ] 2. `set`
    
- [ ] 3. `map`
    
- [ ] 4. `map.keys()`
    
- [ ] 5. `map.keySet()`
    
- [ ] 6. `map.values()`
    
- [ ] 7. `map.valueSet()`
    

### Question 12

Which of these statements can fill in the blank so that the `Wildcard` class compiles successfully? (Choose all that apply.)

Java

```
3: public class Wildcard {
4:     public void showSize(List<?> list) {
5:         System.out.println(list.size());
6:     }
7:     public static void main(String[] args) {
8:         Wildcard card = new Wildcard();
9:         _________________________________________;
10:        card.showSize(list);
11:    } 
12: }
```

- [ ] 1. `` `List<?> list = new HashSet <String>()` ``
    
- [ ] 2. `` `ArrayList<? super Date> list = new ArrayList<Date>()` ``
    
- [ ] 3. `` `List<?> list = new ArrayList<?>()` ``
    
- [ ] 4. `` `List<Exception> list = new LinkedList<java.io.IOException>()` ``
    
- [ ] 5. `` `ArrayList <? extends Number> list = new ArrayList <Integer>()` ``
    
- [ ] 6. None of the above
    

### Question 13

What is the result of the following program?

Java

```
3: public record Sorted(int num, String text)
4:     implements Comparable<Sorted>, Comparator<Sorted> {
5:
6:     public String toString() { return "" + num; }
7:     public int compareTo(Sorted s) {
8:         return text.compareTo(s.text);
9:     }
10:    public int compare(Sorted s1, Sorted s2) {
11:        return s1.num - s2.num;
12:    }
13:    public static void main(String[] args) {
14:        var s1 = new Sorted(88, "a");
15:        var s2 = new Sorted(55, "b");
16:        SequencedSet<Sorted> t1 = new TreeSet<Sorted>();
17:        t1.add(s1); t1.add(s2);
18:        var t2 = new TreeSet<Sorted>(s1);
19:        t2.add(s1); t2.add(s2);
20:        System.out.println(t1 + " " + t2);
21:    } 
22: }
```

- [ ] 1.
    
    `[55, 88] [55, 88]`
    
- [ ] 2. `[55, 88] [88, 55]`
    
- [ ] 3. `[88, 55] [55, 88]`
    
- [ ] 4. `[88, 55] [88, 55]`
    
- [ ] 5. The code does not compile.
    
- [ ] 6. A runtime exception is thrown.
    

### Question 14

What is the result of the following code?

Java

```
Comparator<Integer> c1 = (o1, o2) -> o2 - o1;
Comparator<Integer> c2 = Comparator.naturalOrder();
Comparator<Integer> c3 = Comparator.reverseOrder();
var list = Arrays.asList(5, 4, 7, 2);
Collections.sort(list,_____________);
Collections.reverse(list);
Collections.reverse(list);
System.out.println(Collections.binarySearch(list, 2));
```

- [ ] 1. One or more of the comparators can fill in the blank so that the code prints 0.
    
- [ ] 2. One or more of the comparators can fill in the blank so that the code prints 1.
    
- [ ] 3. One or more of the comparators can fill in the blank so that the code prints 2.
    
- [ ] 4. The result is undefined regardless of which comparator is used.
    
- [ ] 5. A runtime exception is thrown regardless of which comparator is used.
    
- [ ] 6. The code does not compile.
    

### Question 15

Which of the following lines can be inserted to make the code compile? (Choose all that apply.)

Java

```
class W {}
class X extends W {}
class Y extends X {}
class Z<Y> {
    // INSERT CODE HERE
}
```

- [ ] 1. `` `W w1 = new W();` ``
    
- [ ] 2. `` `W w2 = new X();` ``
    
- [ ] 3. `` `W w3 = new Y();` ``
    
- [ ] 4. `` `Y y1 = new W();` ``
    
- [ ] 5. `` `Y y2 = new X();` ``
    
- [ ] 6. `` `Y y3 = new Y();` ``
    

### Question 16

Which options are true of the following code? (Choose all that apply.)

Java

```
_____________ q = new LinkedList<>();
var u = Collections.unmodifiableCollection(q);
q.add(10);
q.add(12);
q.remove(1);
System.out.print(u);
```

- [ ] 1. If we fill in the blank with `` `List<Integer>` ``, the output is `[10]`.
    
- [ ] 2. If we fill in the blank with `` `Queue<Integer>` ``, the output is `[10]`.
    
- [ ] 3. If we fill in the blank with `var`, the output is `[10]`.
    
- [ ] 4. One or more of the scenarios does not compile.
    
- [ ] 5. One or more of the scenarios throws a runtime exception.
    

### Question 17

What is the result of the following code?

Java

```
4: Map m = new HashMap();
5: m.put(123, "456");
6: m.put("abc", "def");
7: System.out.println(m.contains("123"));
```

- [ ] 1. false
    
- [ ] 2. true
    
- [ ] 3. Compiler error on line 4.
    
- [ ] 4. Compiler error on line 5.
    
- [ ] 5. Compiler error on line 7.
    
- [ ] 6. A runtime exception is thrown.
    

### Question 18

What is the result of the following code? (Choose all that apply.)

Java

```
48: var map = Map.of(1,2, 3, 6);
49: var list = List.copyOf(map.entrySet());
50:
51: List<Integer> one = List.of(8, 16, 2);
52: var copy = List.copyOf(one);
53: var copyOfCopy = List.copyOf(copy);
54: var thirdCopy = new ArrayList<>(copyOfCopy);
55:
56: list.replaceAll(x -> x * 2);
57: one.replaceAll(x -> x * 2);
58: thirdCopy.replaceAll(x -> x * 2);
59:
60: System.out.println(thirdCopy);
```

- [ ] 1. One line fails to compile.
    
- [ ] 2. Two lines fail to compile.
    
- [ ] 3. Three lines fail to compile.
    
- [ ] 4. The code compiles but throws an exception at runtime.
    
- [ ] 5. If any lines with compiler errors are removed, the code throws an exception at runtime.
    
- [ ] 6. If any lines with compiler errors are removed, the code prints `[16, 32, 4]`.
    
- [ ] 7. The code compiles and prints `[16, 32, 4]` without any changes.
    

### Question 19

What code change is needed to make the method compile, assuming there is no class named `T`?

Java

```
public static T identity(T t) {
    return t;
}
```

- [ ] 1. Add `` `<T>` `` after the `public` keyword.
    
- [ ] 2. Add `` `<T>` `` after the `static` keyword.
    
- [ ] 3. Add `` `<T>` `` after `T`.
    
- [ ] 4. Add `` `<?>` `` after the `public` keyword.
    
- [ ] 5. Add `` `<?>` `` after the `static` keyword.
    
- [ ] 6. No change is required. The code already compiles.
    

### Question 20

Assuming keys are printed in order, what is the result of the following?

Java

```
var map = new HashMap<Integer, Integer>();
map.put(1, 10);
map.put(2, 20);
map.put(3, null);
map.merge(1, 3, (a,b) -> a + b);
map.merge(3, 3, (a,b) -> a + b);
System.out.println(map);
```

- [ ] 1. `{1=10, 2=20}`
    
- [ ] 2. `{1=10, 2=20, 3=null}`
    
- [ ] 3. `{1=10, 2=20, 3=3}`
    
- [ ] 4. `{1=13, 2=20}`
    
- [ ] 5. `{1=13, 2=20, 3=null}`
    
- [ ] 6. `{1=13, 2=20, 3=3}`
    
- [ ] 7. The code does not compile.
    
- [ ] 8. An exception is thrown.
    

### Question 21

Which of the following statements are true? (Choose all that apply.)

- [ ] 1. `Comparable` is in the `java.util` package.
    
- [ ] 2. `Comparator` is in the `java.util` package.
    
- [ ] 3. `compare()` is in the `Comparable` interface.
    
- [ ] 4. `compare()` is in the `Comparator` interface.
    
- [ ] 5. `compare()` takes one method parameter.
    
- [ ] 6. `compare()` takes two method parameters.
    

### Question 22

What is the output of the following code snippet?

Java

```
21: SequencedMap<Integer, String> cats = new TreeMap<>();
22: cats.put(3, "Snowball");
23: cats.put(2, "Sugar");
24: cats.put(1, "Minnie Mouse");
25: cats.pollFirstEntry();
26: var id = cats.lastEntry().getKey();
27: cats.pollFirstEntry();
28: System.out.print(cats.firstEntry().getValue());
```

- [ ] 1. Minnie Mouse
    
- [ ] 2. Snowball
    
- [ ] 3. Sugar
    
- [ ] 4. The code does not compile.
    
- [ ] 5. The code compiles, but an exception is thrown at runtime.
    

### Question 23

What is the output of the following code snippet?

Java

```
var fishes = new TreeSet<String>();
fishes.add("Koi");
fishes.addFirst("clown");
fishes.add("carp");
for(var fish : fishes)
    System.out.print(fish + ", ");
```

- [ ] 1. carp, clown, Koi,
    
- [ ] 2. carp, Koi, clown,
    
- [ ] 3. clown, carp, Koi,
    
- [ ] 4. clown, Koi, carp,
    
- [ ] 5. Koi, carp, clown,
    
- [ ] 6. Koi, clown, carp,
    
- [ ] 7. The code does not compile.
    
- [ ] 8. The code compiles but throws an exception at runtime.