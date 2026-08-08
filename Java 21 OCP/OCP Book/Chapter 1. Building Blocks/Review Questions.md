Here is your quiz fully reformatted into cleanly structured Markdown, ready to be saved into Obsidian.

I have standardized the layouts, fixed any raw line breaks within options, added proper code blocks for readability, and wrapped multiple-choice answers in checkboxes (`- [ ]`) so you can interactively check off your answers right inside Obsidian!

# Java Certification Practice Quiz

## Question 1

Which of the following are legal entry point methods that can be run from the command line? _(Choose all that apply.)_

- [ ] 1. `private static void main(String[] args)`
    
- [ ] 2. `public static final main(String[] args)`
    
- [ ] 3. `public void main(String[] args)`
    
- [ ] 4. `public static final void main(String[] args)`
    
- [ ] 5. `public static void main(String[] args)`
    
- [ ] 6. `public static main(String[] args)`
    

## Question 2

Which answer options represent the order in which the following statements can be assembled into a program that will compile successfully? _(Choose all that apply.)_

Java

```
X: class Rabbit {}
Y: import java.util.*;
Z: package animals;
```

- [ ] 1. X, Y, Z
    
- [ ] 2. Y, Z, X
    
- [ ] 3. Z, Y, X
    
- [ ] 4. Y, X
    
- [ ] 5. Z, X
    
- [ ] 6. X, Z
    
- [ ] 7. None of the above
    

## Question 3

Which of the following are true? _(Choose all that apply.)_

Java

```
public class Bunny {
    public static void main(String[] x) {
        Bunny bun = new Bunny();
    } 
}
```

- [ ] 1. `Bunny` is a class.
    
- [ ] 2. `bun` is a class.
    
- [ ] 3. `main` is a class.
    
- [ ] 4. `Bunny` is a reference to an object.
    
- [ ] 5. `bun` is a reference to an object.
    
- [ ] 6. `main` is a reference to an object.
    
- [ ] 7. The `main()` method doesn’t run because the parameter name is incorrect.
    

## Question 4

Which of the following are valid Java identifiers? _(Choose all that apply.)_

- [ ] 1. `_`
    
- [ ] 2. `helloWorld$`
    
- [ ] 3. `true`
    
- [ ] 4. `java.lang`
    
- [ ] 5. `Public`
    
- [ ] 6. `1980_s`
    
- [ ] 7. `_Q2_`
    

## Question 5

Which statements about the following program are correct? _(Choose all that apply.)_

Java

```
2: public class Bear {
3:     private Bear pandaBear;
4:     private void roar(Bear b) {
5:         System.out.println("Roar!");
6:         pandaBear = b;
7:     }
8:     public static void main(String[] args) {
9:         Bear brownBear = new Bear();
10:        Bear polarBear = new Bear();
11:        brownBear.roar(polarBear);
12:        polarBear = null;
13:        brownBear = null;
14:        System.gc(); 
15:    } 
16: }
```

- [ ] 1. The object created on line 9 is first eligible for garbage collection after line 13.
    
- [ ] 2. The object created on line 9 is first eligible for garbage collection after line 14.
    
- [ ] 3. The object created on line 10 is first eligible for garbage collection after line 12.
    
- [ ] 4. The object created on line 10 is first eligible for garbage collection after line 13.
    
- [ ] 5. Garbage collection is guaranteed to run.
    
- [ ] 6. Garbage collection might or might not run.
    
- [ ] 7. The code does not compile.
    

## Question 6

Assuming the following class compiles, how many variables defined in the class or method are in scope on the line marked on line 14?

Java

```
1: public class Camel {
2:     { int hairs = 3_000_0; }
3:     long water, air = 2;
4:     boolean twoHumps = true;
5:     public void spit(float distance) {
6:         var path = "";
7:         { double teeth = 32 + distance++; }
8:         while(water > 0) {
9:             int age = twoHumps ? 1 : 2;
10:            short i = -1;
11:            for(i = 0; i < 10; i++) {
12:                var Private = 2;
13:            }
14:            // SCOPE
15:        }
16:     }
17: }
```

- [ ] 1. 2
    
- [ ] 2. 3
    
- [ ] 3. 4
    
- [ ] 4. 5
    
- [ ] 5. 6
    
- [ ] 6. 7
    
- [ ] 7. None of the above
    

## Question 7

Which are true about this code? _(Choose all that apply.)_

Java

```
public class KitchenSink {
    private int numForks;
    public static void main(String[] args) {
        int numKnives;
        System.out.print("""
            "# forks = " + numForks +
            " # knives = " + numKnives +
            # cups = 0""");
    }
}
```

- [ ] 1. The output includes `# forks = 0`.
    
- [ ] 2. The output includes `# knives = 0`.
    
- [ ] 3. The output includes `# cups = 0`.
    
- [ ] 4. The output includes a blank line.
    
- [ ] 5. The output includes one or more lines that begin with whitespace.
    
- [ ] 6. The code does not compile.
    

## Question 8

Which of the following code snippets about `var` compile without issue when used in a method? _(Choose all that apply.)_

- [ ] 1. `var spring = null;`
    
- [ ] 2. `var fall = "leaves";`
    
- [ ] 3. `var evening = 2; evening = null;`
    
- [ ] 4. `var night = Integer.valueOf(3);`
    
- [ ] 5. `var day = 1/0;`
    
- [ ] 6. `var winter = 12, cold;`
    
- [ ] 7. `var fall = 2, autumn = 2;`
    
- [ ] 8. `var morning = ""; morning = null;`
    

## Question 9

Which of the following is correct?

- [ ] 1. An instance variable of type `float` defaults to `0`.
    
- [ ] 2. An instance variable of type `char` defaults to `null`.
    
- [ ] 3. A local variable of type `double` defaults to `0.0`.
    
- [ ] 4. A local variable of type `int` defaults to `null`.
    
- [ ] 5. A class variable of type `String` defaults to `null`.
    
- [ ] 6. A class variable of type `String` defaults to the empty string `""`.
    
- [ ] 7. None of the above.
    

## Question 10

Which of the following expressions, when inserted independently into the blank line, allow the code to compile? _(Choose all that apply.)_

Java

```
public void printMagicData() {
    var magic = ____________;
    System.out.println(magic);
}
```

- [ ] 1. `3_1`
    
- [ ] 2. `1_329_.0`
    
- [ ] 3. `3_13.0_`
    
- [ ] 4. `5_291._2`
    
- [ ] 5. `2_234.0_0`
    
- [ ] 6. `9___6`
    
- [ ] 7. `_1_3_5_0`
    

## Question 11

Given the following two class files, what is the maximum number of imports that can be removed and have the code still compile?

Java

```
// Water.java
package aquarium;
public class Water { }

// Tank.java
package aquarium;
import java.lang.*;
import java.lang.System;
import aquarium.Water;
import aquarium.*;

public class Tank {
    public void print(Water water) {
        System.out.println(water); 
    } 
}
```

- [ ] 1. 0
    
- [ ] 2. 1
    
- [ ] 3. 2
    
- [ ] 4. 3
    
- [ ] 5. 4
    
- [ ] 6. Does not compile
    

## Question 12

Which statements about the following class are correct? _(Choose all that apply.)_

Java

```
1: public class ClownFish {
2:     int gills = 0, double weight = 2;
3:     { int fins = gills; }
4:     void print(int length = 3) {
5:         System.out.println(gills);
6:         System.out.println(weight);
7:         System.out.println(fins);
8:         System.out.println(length);
9:     } 
10: }
```

- [ ] 1. Line 2 generates a compiler error.
    
- [ ] 2. Line 3 generates a compiler error.
    
- [ ] 3. Line 4 generates a compiler error.
    
- [ ] 4. Line 7 generates a compiler error.
    
- [ ] 5. The code prints 0.
    
- [ ] 6. The code prints 2.0.
    
- [ ] 7. The code prints 2.
    
- [ ] 8. The code prints 3.
    

## Question 13

Given the following classes, which of the following snippets can independently be inserted in place of `INSERT IMPORTS HERE` and have the code compile? _(Choose all that apply.)_

Java

```
// File 1
package aquarium;
public class Water {
    boolean salty = false;
}

// File 2
package aquarium.jellies;
public class Water {
    boolean salty = true;
}

// File 3
package employee;
INSERT IMPORTS HERE
public class WaterFiller {
    Water water;
}
```

- [ ] 1. `import aquarium.*;`
    
- [ ] 2. `import aquarium.Water;`
    
- [ ] 3. `import aquarium.jellies.*;`
    
- [ ] 4. `import aquarium.*;`
    
- [ ] 5. `import aquarium.jellies.Water;`
    
- [ ] 6. `import aquarium.*; import aquarium.jellies.*;`
    
- [ ] 7. `import aquarium.Water; import aquarium.jellies.Water;`
    
- [ ] 8. None of the above
    

## Question 14

Which of the following statements about the code snippet are true? _(Choose all that apply.)_

Java

```
3: short numPets = 5L;
4: int numGrains = 2.0;
5: String name = "Scruffy";
6: int d = numPets.length();
7: int e = numGrains.length;
8: int f = name.length();
```

- [ ] 1. Line 3 generates a compiler error.
    
- [ ] 2. Line 4 generates a compiler error.
    
- [ ] 3. Line 5 generates a compiler error.
    
- [ ] 4. Line 6 generates a compiler error.
    
- [ ] 5. Line 7 generates a compiler error.
    
- [ ] 6. Line 8 generates a compiler error.
    

## Question 15

Which of the following statements about garbage collection are correct? _(Choose all that apply.)_

- [ ] 1. Calling `System.gc()` is guaranteed to free up memory by destroying objects eligible for garbage collection.
    
- [ ] 2. Garbage collection runs on a set schedule.
    
- [ ] 3. Garbage collection allows the JVM to reclaim memory for other objects.
    
- [ ] 4. Garbage collection runs when your program has used up half the available memory.
    
- [ ] 5. An object may be eligible for garbage collection but never removed from the heap.
    
- [ ] 6. An object is eligible for garbage collection once no references to it are accessible in the program.
    
- [ ] 7. Marking a variable `final` means its associated object will never be garbage collected.
    

## Question 16

Which are true about this code? _(Choose all that apply.)_

Java

```
var blocky = """
    squirrel \s
    pigeon \
    termite""";
System.out.print(blocky);
```

- [ ] 1. It outputs two lines.
    
- [ ] 2. It outputs three lines.
    
- [ ] 3. It outputs four lines.
    
- [ ] 4. There is one line with trailing whitespace.
    
- [ ] 5. There are two lines with trailing whitespace.
    
- [ ] 6. If we indented each line five characters, it would change the output.
    

## Question 17

What lines are printed by the following program? _(Choose all that apply.)_

Java

```
1: public class WaterBottle {
2:     private String brand;
3:     private boolean empty;
4:     public static float code;
5:     public static void main(String[] args) {
6:         WaterBottle wb = new WaterBottle();
7:         System.out.println("Empty = " + wb.empty);
8:         System.out.println("Brand = " + wb.brand);
9:         System.out.println("Code = " + code);
10:    } 
11: }
```

- [ ] 1. Line 8 generates a compiler error.
    
- [ ] 2. Line 9 generates a compiler error.
    
- [ ] 3. Empty =
    
- [ ] 4. Empty = false
    
- [ ] 5. Brand =
    
- [ ] 6. Brand = null
    
- [ ] 7. Code = 0.0
    
- [ ] 8. Code = 0f
    

## Question 18

Which of the following statements about `var` are true? _(Choose all that apply.)_

- [ ] 1. A `var` can be used as a constructor parameter.
    
- [ ] 2. The type of a `var` is known at compile time.
    
- [ ] 3. A `var` cannot be used as an instance variable.
    
- [ ] 4. A `var` can be used in a multiple variable assignment statement.
    
- [ ] 5. The value of a `var` cannot change at runtime.
    
- [ ] 6. The type of a `var` cannot change at runtime.
    
- [ ] 7. The word `var` is a reserved word in Java.
    

## Question 19

Which are true about the following code? _(Choose all that apply.)_

Java

```
var num1 = Integer.parseInt("11");
var num2 = Integer.valueOf("B", 16);
System.out.println(Integer.max(num1, num2));
```

- [ ] 1. The output is 11.
    
- [ ] 2. The output is B.
    
- [ ] 3. The code does not compile.
    
- [ ] 4. `num1` is a primitive.
    
- [ ] 5. `num2` is a primitive.
    
- [ ] 6. A `NumberFormatException` is thrown.
    

## Question 20

Which statement about the following class is correct?

Java

```
1: public class PoliceBox {
2:     String color;
3:     long age;
4:     public void PoliceBox() {
5:         color = "blue";
6:         age = 1200;
7:     }
8:     public static void main(String[] time) {
9:         var p = new PoliceBox();
10:        var q = new PoliceBox();
11:        p.color = "green";
12:        p.age = 1400;
13:        p = q;
14:        System.out.println("Q1=" + q.color);
15:        System.out.println("Q2=" + q.age);
16:        System.out.println("P1=" + p.color);
17:        System.out.println("P2=" + p.age);
18:    } 
19: }
```

- [ ] 1. It prints `Q1=blue`.
    
- [ ] 2. It prints `Q2=1200`.
    
- [ ] 3. It prints `P1=null`.
    
- [ ] 4. It prints `P2=1400`.
    
- [ ] 5. Line 4 does not compile.
    
- [ ] 6. Line 12 does not compile.
    
- [ ] 7. Line 13 does not compile.
    
- [ ] 8. None of the above.
    

## Question 21

What is the output of executing the following class?

Java

```
1: public class Salmon {
2:     int count;
3:     { System.out.print(count + "-"); }
4:     { count++; }
5:     public Salmon() {
6:         count = 4;
7:         System.out.print(2 + "-");
8:     }
9:     public static void main(String[] args) {
10:        System.out.print(7 + "-");
11:        var s = new Salmon();
12:        System.out.print(s.count + "-"); 
13:    } 
14: }
```

- [ ] 1. 7-0-2-1-
    
- [ ] 2. 7-0-1-
    
- [ ] 3. 0-7-2-1-
    
- [ ] 4. 7-0-2-4-
    
- [ ] 5. 0-7-1-
    
- [ ] 6. The class does not compile because of line 3.
    
- [ ] 7. The class does not compile because of line 4.
    
- [ ] 8. None of the above.
    

## Question 22

Given the following class, which of the following lines of code can independently replace `INSERT CODE HERE` to make the code compile? _(Choose all that apply.)_

Java

```
public class Price {
    public void admission() {
        INSERT CODE HERE
        System.out.print(amount);
    } 
}
```

- [ ] 1. `int Amount = 0b11;`
    
- [ ] 2. `int amount = 9L;`
    
- [ ] 3. `int amount = 0xE;`
    
- [ ] 4. `int amount = 1_2.0;`
    
- [ ] 5. `double amount = 1_0_.0;`
    
- [ ] 6. `int amount = 0b101;`
    
- [ ] 7. `double amount = 9_2.1_2;`
    
- [ ] 8. `double amount = 1_2_.0_0;`
    

## Question 23

Which statements about the following class are true? _(Choose all that apply.)_

Java

```
1: public class River {
2:     int Depth = 1;
3:     float temp = 50.0;
4:     public void flow() {
5:         for (int i = 0; i < 1; i++) {
6:             int depth = 2;
7:             depth++;
8:             temp--;
9:         }
10:        System.out.println(depth);
11:        System.out.println(temp); 
12:    }
13:    public static void main(String... s) {
14:        new River().flow();
15:    } 
16: }
```

- [ ] 1. Line 3 generates a compiler error.
    
- [ ] 2. Line 6 generates a compiler error.
    
- [ ] 3. Line 7 generates a compiler error.
    
- [ ] 4. Line 10 generates a compiler error.
    
- [ ] 5. The program prints 3 on line 10.
    
- [ ] 6. The program prints 4 on line 10.
    
- [ ] 7. The program prints 50.0 on line 11.
    
- [ ] 8. The program prints 49.0 on line 11.