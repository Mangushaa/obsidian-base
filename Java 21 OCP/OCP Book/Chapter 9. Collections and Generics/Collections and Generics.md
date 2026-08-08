## Applying var

If diamond operator will be used, then generic is Object by default, but it will compile!!

```
var list = new ArrayList<Integer>();
var mapOfLists = new HashMap<Long,List<Integer>>();
```


## API

###  Collection

```
// ADDING ELEMENTS

public boolean add(E element) // returns if element was added (Set can return 'false')

// REMOVING ELEMENTS

public boolean remove(Object object) // returns is element was removed

// COUNTING ELEMENTS

public boolean isEmpty()
public int size()

// CLEARING THE COLLECTIONS

public void clear()

// CHECKING CONTENTS

public boolean contains(Object object) // NOTE that method is not paramtrized, any object can be passed, class cast is not thrown.

// REMOVING WITH CONDITION
public boolean removeIf(Predicate<? super E> filter)

// ITERATING 
public void forEach(Consumer<? super T> action)

// EQUALS 

list1.equals(list2)


```

### List
![[Pasted image 20260622185228.png]]


![[Pasted image 20260622185338.png]]

Arrays.asList(varargs) - create list of array, if array is modified change is made to list as well.

![[Pasted image 20260622185636.png]]

**NOTE:** remove(int) is present in both List and Collection

```
31: var list = new LinkedList<Integer>();
32: list.add(3);
33: list.add(2);
34: list.add(1);
35: list.remove(2); // Remove by index since primitive
36: list.remove(Integer.valueOf(2)); // Remove element by value since boxed
37: System.out.println(list);
```

### Converting from List to an Array

```
16: Object[] objectArray = list.toArray();
17: String[] stringArray = list.toArray(new String[0]);
18: list.clear();
```

Line 16 shows that a List knows how to convert itself to an array. The only problem is that it
defaults to an array of class Object. This isn’t usually what you want. Line 17 specifies the
type of the array and does what we want. The advantage of specifying a size of 0 for the
parameter is that Java will create a new array of the proper size for the return value. If you
like, you can suggest a larger array to be used instead. If the List fits in that array, it will be
returned. Otherwise, a new array will be created 
Also, notice that line 18 clears the original List. This does not affect either array. The array
is a newly created object with no relationship to the original List. It is simply a copy.

## Using the Set Interface

**NOTE:** Impls - HashSet, LinkedHashSet, TreeSet 

**NOTE:** Do not garantee order

```
Set.add() - returns boolean if element was added
```


## Using the Queue and Deque Interfaces

**Queue**

![[Pasted image 20260622231011.png]]

**NOTE:** Bolded methods will throw exception if no elements (element, removed). If implementation is capacity restricted, add also can throw exception.

**Dequeue**
![[Pasted image 20260622231340.png]]
![[Pasted image 20260622231431.png]]

## Map 
![[Pasted image 20260622231913.png]]

**NOTE:** The merge() method also has logic for what happens if null values or missing keys are
involved. In this case, it doesn’t call the BiFunction at all, and it simply uses the new value.
```
BiFunction<String, String, String> mapper =
(v1, v2) -> v1.length()> v2.length() ? v1 : v2;
Map<String, String> favorites = new HashMap<>();
favorites.put("Sam", null);
favorites.merge("Tom", "Skyride", mapper);
favorites.merge("Sam", "Skyride", mapper);
System.out.println(favorites); // {Tom=Skyride, Sam=Skyride}
```
Notice that the mapping function isn’t called. If it were, we’d have a NullPointerException.

**NOTE:** merge() when the mapping function is called and returns null. The key is removed from the map when this happens.

![[Pasted image 20260622233451.png]]

## Sorting data

```
Collections.sort(collection)
Collections.sort(collection, comparator)
```

![[Pasted image 20260623021841.png]]

## Comparator

**NOTE:** We can chain comparations with comparator
```
Comparator<Squirrel> c = Comparator.comparing(Squirrel::species)
.thenComparingInt(Squirrel::weight);
```

**NOTE:** To sort in in desc order 

```
var c = Comparator.comparing(Squirrel::species).reversed();
```

![[Pasted image 20260623133611.png]]

![[Pasted image 20260623133717.png]]

## Sorting and Searching

**NOTE:** The binarySearch() method requires a sorted List.

```
2: public class UseTreeSet {
3: record Rabbit(int id) {}
4: public static void main(String[] args) {
5: Set<Duck> ducks = new TreeSet<>();
6: ducks.add(new Duck("Puddles"));
7:
8: Set<Rabbit> rabbits = new TreeSet<>();
9: rabbits.add(new Rabbit(1)); // ClassCastException
10: } }


8: Set<Rabbit> rabbits = new TreeSet<>((r1, r2) -> r1.id - r2.id);
9: rabbits.add(new Rabbit(1)); //Works fine comparator passed separatly
```

**NOTE:** ClassCastException, not compilation error!!

**NOTE:** While you can call Collections.sort(list), you can also sort directly on the list object.

```
3: List<String> bunnies = new ArrayList<>();
4: bunnies.add("long ear");
5: bunnies.add("floppy");
6: bunnies.add("hoppy");
7: System.out.println(bunnies); // [long ear, floppy, hoppy]
8: bunnies.sort((b1, b2) -> b1.compareTo(b2));
9: System.out.println(bunnies); // [floppy, hoppy, long ear]
```

## Sequenced Collections

Interfaces: 
- SequencedCollection
- SequencedSet
- SequencedMap
![[Pasted image 20260623135710.png]]


**NOTE:** It's not possible to insert element to certain position in sorted structures as TreeSet f.e. java.lang.UnsupportedOperationException will be thrown.

**NOTE:** SequencedSet is same interface as SequencedCollection and applied to LinketHashSet, TreeSet

![[Pasted image 20260623211228.png]]

**NOTE:** SequencedMap is same interface are applied only to to LinketHashMap, TreeMap

**NOTE:** Most of the collections that you have worked with throughout this book are sequenced. Two notable exceptions are HashSet and HashMap.

## Using Unmodifiable Wrapper Views

```
Collection<String> coll = Collections.unmodifiableCollection(List.of("brown"));
List<String> list = Collections.unmodifiableList(List.of("orange"));
Set<String> set = Collections.unmodifiableSet(Set.of("green"));
Map<String,Integer> map = Collections.unmodifiableMap(Map.of("red", 1));
```

**NOTE:** Wrapper wrap original collection, so if original collection will be modified through original modifiable reference it will be visible on unmodifiable one.

```
10: Map<String, Integer> map = new TreeMap<>();
11: map.put("blue", 41);
12: map.put("red", 90);
13: List<String> list = Arrays.asList("green", "yellow");
14: Set<String> set = new HashSet<>(list);
15:
16: Map<String, Integer> mapView = Collections.unmodifiableMap(map);
18: Collection<String> collView = Collections.unmodifiableCollection(list);
19: List<String> listView = Collections.unmodifiableList(list);
20: Set<String> setView = Collections.unmodifiableSet(set);
collView.add("pink");
setView.remove("green");
mapView.put("blue", 42);
24: System.out.println(mapView); // {blue=41, red=90}
25: System.out.println(collView); // [green, yellow]
26: System.out.println(listView); // [green, yellow]
27: System.out.println(setView); // [green, yellow]
28:
29: map.put("blue", 105);
30: list.set(1, "purple");
31:
32: System.out.println(mapView); // {blue=105, red=90}
33: System.out.println(collView); // [green, purple]
34: System.out.println(listView); // [green, purple]
35: System.out.println(setView); // [green, yellow]
```

## Comparing Collection Types

**NOTE:** The exam expects you to know that data structures that involve sorting require you to tread carefully with null. For sorted sets, that means null is not permitted; and for sorted maps, this means null keys are not permitted

## Working with Generics

**NOTE:** Only one of these two methods is allowed in a class because type erasure will reduce both sets of arguments to (List input).

```
public class LongTailAnimal {
   protected void chew(List<Object> input) {}
   protected void chew(List<Double> input) {} // DOES NOT COMPILE basically both in bytecode will be List<Object>
}
```

**NOTE**: For the same reason, you also can’t overload a generic method from a parent class.

```
public class LongTailAnimal {
   protected void chew(List<Object> input) {}
}

public class Anteater extends LongTailAnimal {
   protected void chew(List<Double> input) {} // DOES NOT COMPILE
}

public class Anteater extends LongTailAnimal {
protected void chew(List<Object> input) {} // Works fine it is overriding
protected void chew(ArrayList<Double> input) {} // Works fine it is overloading
}
```
In case above it's not overloading cause after type erase both will be List{Object}. But is also not overriding, cause compiler want generic to be same type.

## Returning Generic Types
**NOTE:** When you’re working with overridden methods that return generics, the return values must be covariant. In terms of generics, this means the return type of the class or interface declared in the overriding method must be a subtype of the class defined in the parent class. The generic parameter type must match its parent’s type exactly.

```
public class Mammal {
   public List<CharSequence> play() { … }
   public CharSequence sleep() { … }
}

public class Monkey extends Mammal {
   public ArrayList<CharSequence> play() { … } // Return type is subtype and Generic fully match
}
   
public class Goat extends Mammal {
   public List<String> play() { … } // DOES NOT COMPILE // type same but generic do not match exactly
   public String sleep() { … } // Return type is subtype
}
```

**NOTE:** For the exam, it might be helpful for you to apply type erasure to questions involving
generics to ensure that they compile properly. Once you’ve determined which methods are
overridden and which are being overloaded, work backward, making sure the generic types
match for overridden methods. And remember, generic methods cannot be overloaded by
changing the generic parameter type only.

## Implementing Generic Interfaces

```
public interface Shippable<T> {
   void ship(T t);
}

// Options to implement


// Implementing specify type
class ShippableRobotCrate implements Shippable<Robot> { 
   public void ship(Robot t) { }
}

// Make class also generic and pass type to interface
class ShippableAbstractCrate<U> implements Shippable<U> {
   public void ship(U t) { }
}

// Basically object param
class ShippableCrate implements Shippable {
   public void ship(Object t) { }
}
```

## What You Can’t Do with Generic Types

**NOTE:** There are some limitations on what you can do with a generic type. These aren’t on the exam, but it will be helpful to refer to this scenario when you are writing practice programs and run into one of these situations.

- Call a constructor: Writing new T() is not allowed because at runtime, it would be new Object().
- Create an array of that generic type: This one is the most annoying, but it makes sense because you’d be creating an array of Object values.
- Call instanceof: This is not allowed because at runtime List{Integer} and List{String} look the same to Java, thanks to type erasure.
- Use a primitive type as a generic type parameter: This isn’t a big deal because you can use the wrapper class instead. If you want a type of int, just use Integer.
- Create a static variable as a generic type parameter: This is not allowed because the type is linked to the instance of the class.
- Catch an exception of type T: Even if T extends Exception, it cannot be used in a catch block since the precise type is not known.

## Writing Generic Methods

```
public class Handler {
   public static <T> void prepare(T t) {
      System.out.println("Preparing " + t);
   }
   public static <T> Crate<T> ship(T t) {
      System.out.println("Shipping " + t);
   return new Crate<T>();
   }
}
```

```
2: public class More {
3: public static <T> void sink(T t) { } 
4: public static <T> T identity(T t) { return t; } 
5: public static T noGood(T t) { return t; } // DOES NOT COMPILE Parameter is used but method not defined as paramatrized
6: }
```

**NOTE:** When you have a method declare a generic parameter type, it is independent of the class
generics.

```
1: public class TrickyCrate<T> {
2:    public <T> T tricky(T t) {
3:       return t;
4:    }
5: }

10: public static String crateName() {
11:    TrickyCrate<Robot> crate = new TrickyCrate<>();
12:    return crate.tricky("bot");
13: }
```

On line 11, T is Robot because that is what gets referenced when constructing a Crate. On line 12, T is String because that is what is passed to the method. 

## Optional Syntax for Invoking a Generic Method

**NOTE:** You can call a generic method normally, and the compiler will try to figure out which one
you want. Alternatively, you can specify the type explicitly to make it obvious what the type
is.

```
Box.<String>ship("package");
Box.<String[]>ship(args);
```

## Creating a Generic Record

```
public record CrateRecord<T>(T contents) {
   @Override
   public T contents() {
      if (contents == null)
         throw new IllegalStateException("missing contents");
      return contents;
   }
}

Robot robot = new Robot();
CrateRecord<Robot> record = new CrateRecord<>(robot);
```

## Bounding Generic Types

![[Pasted image 20260624223101.png]]

```
public static void printList(List<Object> list) {
   for (Object x: list)
   System.out.println(x);
}

------------------------------------------------------------------------------

public static void main(String[] args) {
   List<String> keywords = new ArrayList<>();
   keywords.add("java");
   printList(keywords); // DOES NOT COMPILE Generics are invariant List<String> can not be assigned to List<Object>
}

------------------------------------------------------------------------------

4: List<Integer> numbers = new ArrayList<>();
5: numbers.add(Integer.valueOf(42));
6: List<Object> objects = numbers; // DOES NOT COMPILE
7: objects.add("forty two"); // This will not make sense cause actually List are integers.
8: System.out.println(numbers.get(1));

------------------------------------------------------------------------------

public static void printList(List<?> list) { // List<?> != List<Object> to reference List<?> we can assign any List e.g List<String>, List<Integer> 
   for (Object x: list)
      System.out.println(x);
}

public static void main(String[] args) {
   List<String> keywords = new ArrayList<>();
   keywords.add("java");
   printList(keywords);
}
```



```
List<?> x1 = new ArrayList<>();
var x2 = new ArrayList<>();
```

There are two key differences. First, x1 is of type List, while x2 is of type
ArrayList. Additionally, we can only assign x2 to a List{Object}. These two variables do
have one thing in common. Both return type Object when calling the get() method.


## Creating Upper-Bounded Wildcards

```
ArrayList<Number> list = new ArrayList<Integer>(); // DOES NOT COMPILE
List<? extends Number> list = new ArrayList<Integer>();

public static long total(List<? extends Number> list) {
   long count = 0;
   for (Number number: list)
      count += number.longValue();
   return count;
}
```

**NOTE:** When we work with upper bounds or unbounded wildcards. The list becomes logically immutable and therefore cannot be modified. Technically, you can remove elements from the list, but the exam won’t ask about this. Basically it's PECS rule - PRODUCER - EXTENDS so when we are using upper wildcard (extends) we can only retrieve elements cause we know that value is equal or child of defined wildcard, so reference to wildcard can be used.

```
2: static class Sparrow extends Bird { }
3: static class Bird { }
4:
5: public static void main(String[] args) {
6:    List<? extends Bird> birds = new ArrayList<Bird>();
7:    birds.add(new Sparrow()); // DOES NOT COMPILE
8:    birds.add(new Bird()); // DOES NOT COMPILE
9: }
```


**NOTE:** When using interface in wildcard we use 'extends' not 'implement'

```
private void anyFlyer(List<Flyer> flyer) {}
private void groupOfFlyers(List<? extends Flyer> flyer) {}
```

## Creating Lower-Bounded Wildcards

```
List<String> strings = new ArrayList<String>();
strings.add("tweet");
List<Object> objects = new ArrayList<Object>(strings);
addSound(strings);
addSound(objects);

public static void addSound(List<? super String> list) {
   list.add("quack");
}
```

![[Pasted image 20260625011807.png]]

**NOTE:** When having List{? super T} you can insert any subclass of T to that List. Cause you can be sure sure that list actually will be paramtrized with class which is T of parent of T, so any T or subclass of T safaly can be used.

```
3: List<? super IOException> exceptions = new ArrayList<Exception>();
4: exceptions.add(new Exception()); // DOES NOT COMPILE
5: exceptions.add(new IOException());
6: exceptions.add(new FileNotFoundException());


--------------------------------------------------------------------------------
11: List<?> list6 = new ArrayList<? extends A>(); // DOES NOT COMPILE
```


## Passing Generic Arguments

```
<T> T first(List<? extends T> list) { // Works fine 
   return list.get(0);
}

<T> <? extends T> second(List<? extends T> list) { // DOES NOT COMPILE since return is not a type
  return list.get(0);
}

<B extends A> B third(List<B> list) {
   return new B(); // DOES NOT COMPILE
}

<X> void fifth(List<X super B> list) { } // DOES NOT COMPILE
```

Method third() does not compile. {B extends A} says that you want to use B as a
type parameter just for this method and that it needs to extend the A class. Coincidentally, B is
also the name of a class. Well, it isn’t a coincidence. It’s an evil trick. Within the scope of the
method, B can represent class A, B, or C, because all extend the A class. Since B no longer
refers to the B class in the method, you can’t instantiate it.

fifth(), does not compile because it tries to mix a method-specific type parameter with a wildcard. A wildcard must have a ? in it.