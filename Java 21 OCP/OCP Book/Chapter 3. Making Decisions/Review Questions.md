### Q1. Switch Pattern Matching with Guards

What is the output of the following code snippet?

Java

```
32: Object skips = 10;
33: switch (skips) {
34:     case a when a < 10 -> System.out.print(2);
35:     case b when b >= 10 -> System.out.print(4);
36:     case null -> System.out.print(6);
37:     default -> System.out.print(8);
38: }
```

- [ ] A. 2
    
- [ ] B. 4
    
- [ ] C. 6
    
- [ ] D. 8
    
- [ ] E. Exactly one line does not compile.
    
- [ ] F. Exactly two lines do not compile.
    
- [ ] G. None of the above.
    

### Q2. Switch Expression Data Types

Which of the following data types can be used in a switch expression? (Choose all that apply.)

- [ ] A. enum
    
- [ ] B. int
    
- [ ] C. Byte
    
- [ ] D. long
    
- [ ] E. boolean
    
- [ ] F. double
    

### Q3. Nested If-Else Statements

What is the output of the following code snippet?

Java

```
3: int temperature = 4;
4: long humidity = -temperature + temperature * 3;
5: if (temperature >= 4)
6:     if (humidity < 6) System.out.println("Too Low");
7:     else System.out.println("Just Right");
8: else System.out.println("Too High");
```

- [ ] A. Too Low
    
- [ ] B. Just Right
    
- [ ] C. Too High
    
- [ ] D. A `NullPointerException` is thrown at runtime.
    
- [ ] E. The code will not compile because of line 7.
    
- [ ] F. The code will not compile because of line 8.
    

### Q4. For-Each Expression Right Side Types

Which of the following data types are permitted on the right side of a for-each expression? (Choose all that apply.)

- [ ] A. `Double[][]`
    
- [ ] B. `Object`
    
- [ ] C. `Map`
    
- [ ] D. `List`
    
- [ ] E. `String`
    
- [ ] F. `char[]`
    
- [ ] G. `Exception`
    

### Q5. Arrow Switch Expression Exhaustiveness

What is the output of calling `printReptile(6)`?

Java

```
void printReptile(int category) {
    var type = switch (category) {
        case 1,2 -> "Snake";
        case 3,4 -> "Lizard";
        case 5,6 -> "Turtle";
        case 7,8 -> "Alligator";
    };
    System.out.print(type);
}
```

- [ ] A. Snake
    
- [ ] B. Lizard
    
- [ ] C. Turtle
    
- [ ] D. Alligator
    
- [ ] E. TurtleAlligator
    
- [ ] F. None of the above
    

### Q6. Loops and Unreachable Statements

What is the output of the following code snippet?

Java

```
List<Integer> myFavoriteNumbers = new ArrayList<>();
myFavoriteNumbers.add(10);
myFavoriteNumbers.add(14);

for (var a : myFavoriteNumbers) {
    System.out.print(a + ", ");
    break;
}
for (int b : myFavoriteNumbers) {
    continue;
    System.out.print(b + ", ");
}
for (Object c : myFavoriteNumbers)
    System.out.print(c + ", ");
```

- [ ] A. It compiles and runs without issue but does not produce any output.
    
- [ ] B. 10, 14,
    
- [ ] C. 10, 10, 14,
    
- [ ] D. 10, 10, 14, 10, 14,
    
- [ ] E. Exactly one line of code does not compile.
    
- [ ] F. Exactly two lines of code do not compile.
    
- [ ] G. Three or more lines of code do not compile.
    
- [ ] H. The code contains an infinite loop and does not terminate.
    

### Q7. Array Traversal Syntax

Assuming `weather` is a well-formed nonempty array, which code snippet, when inserted independently into the blank in the following code, prints all of the elements of `weather`? (Choose all that apply.)

Java

```
private void print(int[] weather) {
    for ( ________ ) {
        System.out.println(weather[i]);
    }
}
```

- [ ] A. `int i=weather.length; i>0; i--`
    
- [ ] B. `int i=0; i<=weather.length-1; ++i`
    
- [ ] C. `var w : weather`
    
- [ ] D. `int i=weather.length-1; i>=0; i--`
    
- [ ] E. `int i=0, int j=3; i<weather.length; ++i`
    
- [ ] F. `int i=0; ++i<10 && i<weather.length;`
    
- [ ] G. None of the above
    

### Q8. Pattern Matching and Scope

What is the output of calling `printType(11)`?

Java

```
31: void printType(Object o) {
32:     if (o instanceof Integer bat) {
33:         System.out.print("int");
34:     } else if (o instanceof Integer bat && bat < 10) {
35:         System.out.print("small int");
36:     } else if (o instanceof Long bat || bat <= 20) {
37:         System.out.print("long");
38:     } default {
39:         System.out.print("unknown");
40:     }
41: }
```

- [ ] A. int
    
- [ ] B. small int
    
- [ ] C. long
    
- [ ] D. unknown
    
- [ ] E. Nothing is printed.
    
- [ ] F. The code contains one line that does not compile.
    
- [ ] G. The code contains two lines that do not compile.
    
- [ ] H. None of the above.
    

### Q9. Nested Loops and Labels

Which statements, when inserted independently into the following blank, will cause the code to print `2` at runtime? (Choose all that apply.)

Java

```
int count = 0;
BUNNY: for (int row = 1; row <= 3; row++)
    RABBIT: for (int col = 0; col < 3 ; col++) {
        if ((col + row) % 2 == 0)
            ___________ ;
        count++;
    }
System.out.println(count);
```

- [ ] A. `break BUNNY`
    
- [ ] B. `break RABBIT`
    
- [ ] C. `continue BUNNY`
    
- [ ] D. `continue RABBIT`
    
- [ ] E. `break`
    
- [ ] F. `continue`
    
- [ ] G. None of the above, as the code contains a compiler error
    

### Q10. Switch Block and Labels Rules

Given the following method, how many lines contain compilation errors?

Java

```
8:  enum DayOfWeek {
9:      SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY;
10:     private DayOfWeek getWeekDay(int day, final int thursday) {
11:         int otherDay = day;
12:         int Sunday = 0;
13:         switch (otherDay) {
14:             default:
15:                 case 1: continue;
16:                 case thursday: return DayOfWeek.THURSDAY;
17:                 case 2,10: break;
18:                 case Sunday: return DayOfWeek.SUNDAY;
19:                 case DayOfWeek.MONDAY: return DayOfWeek.MONDAY;
20:         }
21:         return DayOfWeek.FRIDAY;
22:     } }
```

- [ ] A. None, the code compiles and runs without issue.
    
- [ ] B. 1
    
- [ ] C. 2
    
- [ ] D. 3
    
- [ ] E. 4
    
- [ ] F. 5
    
- [ ] G. 6
    
- [ ] H. The code compiles but may produce an error at runtime.
    

### Q11. Switch Expression Rules

What is the output of calling `printLocation(Animal.MAMMAL)`?

Java

```
10: class Zoo {
11:     enum Animal {BIRD, FISH, MAMMAL}
12:     void printLocation(Animal a) {
13:         long type = switch (a) {
14:             case BIRD -> 1;
15:             case FISH -> 2;
16:             case MAMMAL -> 3;
17:             default -> 4;
18:         };
19:         System.out.print(type);
20:     } }
```

- [ ] A. 3
    
- [ ] B. 4
    
- [ ] C. 34
    
- [ ] D. The code does not compile because of line 13.
    
- [ ] E. The code does not compile because of line 17.
    
- [ ] F. None of the above.
    

### Q12. Basic While Loop Trace

What is the result of the following code snippet?

Java

```
3: int sing = 8, squawk = 2, notes = 0;
4: while (sing > squawk) {
5:     sing--;
6:     squawk += 2;
7:     notes += sing + squawk;
8: }
9: System.out.println(notes);
```

- [ ] A. 11
    
- [ ] B. 13
    
- [ ] C. 23
    
- [ ] D. 33
    
- [ ] E. 50
    
- [ ] F. The code will not compile because of line 7.
    

### Q13. Guard Pattern and Expressions

What is the result of calling `getHatSize(9f)` on the following code snippet?

Java

```
10: int getHatSize(Number measurement) {
11:     return switch (measurement) {
12:         case Double d -> 1 + d.intValue();
13:         case null -> 11;
14:         case !(Number n) -> 3 + n.intValue();
15:         case Float f when f < 10 -> 4 + f.intValue();
16:     };
17: }
```

- [ ] A. 10
    
- [ ] B. 11
    
- [ ] C. 12
    
- [ ] D. 13
    
- [ ] E. The code does not compile because it is missing a default clause.
    
- [ ] F. The code does not compile for a different reason.
    

### Q14. Do-While Syntax

What is the output of the following code snippet?

Java

```
2: boolean keepGoing = true;
3: int result = 15, meters = 10;
4: do {
5:     meters--;
6:     if (meters == 8) keepGoing = false;
7:     result -= 2;
8: } while keepGoing;
9: System.out.println(result);
```

- [ ] A. 7
    
- [ ] B. 9
    
- [ ] C. 10
    
- [ ] D. 11
    
- [ ] E. 15
    
- [ ] F. The code will not compile because of line 6.
    
- [ ] G. The code does not compile for a different reason.
    

### Q15. Local Variable Type Inference (`var`)

Which statements about the following code snippet are correct? (Choose all that apply.)

Java

```
for (var penguin : new int[2])
    System.out.println(penguin);
var ostrich = new Character[3];
for (var emu : ostrich)
    System.out.println(emu);
List<Integer> parrots = new ArrayList<Integer>();
for (var macaw : parrots)
    System.out.println(macaw);
```

- [ ] A. The data type of `penguin` is `Integer`.
    
- [ ] B. The data type of `penguin` is `int`.
    
- [ ] C. The data type of `emu` is undefined.
    
- [ ] D. The data type of `emu` is `Character`.
    
- [ ] E. The data type of `macaw` is `List`.
    
- [ ] F. The data type of `macaw` is `Integer`.
    
- [ ] G. None of the above, as the code does not compile.
    

### Q16. Multiple Switch Case Labels Syntax

What is the result of the following code snippet?

Java

```
final char a = 'A', e = 'E';
char grade = 'B';
switch (grade) {
    default:
    case a:
    case 'B': 'C': System.out.print("great ");
    case 'D': System.out.print("good "); break;
    case e:
    case 'F': System.out.print("not good ");
}
```

- [ ] A. great
    
- [ ] B. great good
    
- [ ] C. good
    
- [ ] D. not good
    
- [ ] E. The code does not compile because the data type of one or more case clauses does not match the data type of the switch variable.
    
- [ ] F. None of the above.
    

### Q17. Reverse Array Iteration

Given the following array, which code snippets print the elements in reverse order from how they are declared? (Choose all that apply.)

Java

```
char[] wolf = {'W', 'e', 'b', 'b', 'y'};
```

- [ ] A.
    
    Java
    
    ```
    int q = wolf.length;
    for ( ; ; ) {
        System.out.print(wolf[--q]);
        if (q==0) break;
    }
    ```
    
- [ ] B.
    
    Java
    
    ```
    for (int m=wolf.length-1; m>=0; --m)
        System.out.print(wolf[m]);
    ```
    
- [ ] C.
    
    Java
    
    ```
    for (int z=0; z<wolf.length; z++)
        System.out.print(wolf[wolf.length-z]);
    ```
    
- [ ] D.
    
    Java
    
    ```
    int x = wolf.length-1;
    for (int j=0; x>=0 && j==0; x--)
        System.out.print(wolf[x]);
    ```
    
- [ ] E.
    
    Java
    
    ```
    final int r = wolf.length;
    for (int w = r-1; r>-1; w = r-1)
        System.out.print(wolf[w]);
    ```
    
- [ ] F.
    
    Java
    
    ```
    for (int i=wolf.length; i>0; --i)
        System.out.print(wolf[i]);
    ```
    
- [ ] G. None of the above
    

### Q18. Loop Counters Mechanics

What distinct numbers are printed when the following method is executed? (Choose all that apply.)

Java

```
private void countAttendees() {
    int participants = 4, animals = 2, performers = -1;
    while ((participants = participants + 1) < 10) {}
    do {} while (animals++ <= 1);
    for ( ; performers < 2; performers += 2) {}
    System.out.println(participants);
    System.out.println(animals);
    System.out.println(performers);
}
```

- [ ] A. 6
    
- [ ] B. 3
    
- [ ] C. 4
    
- [ ] D. 5
    
- [ ] E. 10
    
- [ ] F. 9
    
- [ ] G. The code does not compile.
    
- [ ] H. None of the above.
    

### Q19. Loop Variables Variable Scope

What is the output of the following code snippet?

Java

```
2: double iguana = 0;
3: do {
4:     int snake = 1;
5:     System.out.print(snake++ + " ");
6: iguana--;
7: } while (snake <= 5);
8: System.out.println(iguana);
```

- [ ] A. 1 2 3 4 -4.0
    
- [ ] B. 1 2 3 4 -5.0
    
- [ ] C. 1 2 3 4 5 -4.0
    
- [ ] D. 0 1 2 3 4 5 -5.0
    
- [ ] E. The code does not compile.
    
- [ ] F. The code compiles but produces an infinite loop at runtime.
    
- [ ] G. None of the above.
    

### Q20. Flow Control Labels

Which statements, when inserted into the following blanks, allow the code to compile and run without entering an infinite loop? (Choose all that apply.)

Java

```
4: int height = 1;
5: L1: while (height++ < 10) {
6:     long humidity = 12;
7:     L2: do {
8:         if (humidity-- % 12 == 0) ___________ ;
9:         int temperature = 30;
10:        L3: for ( ; ; ) {
11:            temperature++;
12:            if (temperature > 50) ___________ ;
13:        }
14:    } while (humidity > 4);
15: }
```

- [ ] A. `break L2` on line 8; `continue L2` on line 12
    
- [ ] B. `continue` on line 8; `continue` on line 12
    
- [ ] C. `break L3` on line 8; `break L1` on line 12
    
- [ ] D. `continue L2` on line 8; `continue L3` on line 12
    
- [ ] E. `continue L2` on line 8; `continue L2` on line 12
    
- [ ] F. None of the above, as the code contains a compiler error
    

### Q21. Yielding in Switch Expressions

A minimum of how many lines need to be corrected before the following method will compile?

Java

```
21: void findZookeeper(Integer id) {
22:     System.out.print(switch (id) {
23:         case 10 -> {"Jane";}
24:         case 20 -> {yield "Lisa";};
25:         case 30 -> "Kelly";
26:         case 30 -> "Sarah";
27:         default -> "Unassigned";
28:     });
29: }
```

- [ ] A. Zero
    
- [ ] B. One
    
- [ ] C. Two
    
- [ ] D. Three
    
- [ ] E. Four
    
- [ ] F. Five
    

### Q22. Final Switch Expressions Constants

What is the output of the following code snippet?

Java

```
2: var tailFeathers = 3;
3: final var one = 1;
4: switch (tailFeathers) {
5:     case one: System.out.print(3 + " ");
6:     default: case 3: System.out.print(5 + " ");
7: }
8: while (tailFeathers > 1) {
       System.out.print(--tailFeathers + " "); 
   }
```

- [ ] A. 3
    
- [ ] B. 5 1
    
- [ ] C. 5 2
    
- [ ] D. 3 5 1
    
- [ ] E. 5 2 1
    
- [ ] F. The code will not compile because of lines 3–5.
    
- [ ] G. The code will not compile because of line 6.
    

### Q23. Dangler If-Else Structure

What is the output of the following code snippet?

Java

```
15: int penguin = 50, turtle = 75;
16: boolean older = penguin >= turtle;
17: if (older = true) System.out.println("Success");
18: else System.out.println("Failure");
19: else if (penguin != 50) System.out.println("Other");
```

- [ ] A. Success
    
- [ ] B. Failure
    
- [ ] C. Other
    
- [ ] D. The code will not compile because of line 17.
    
- [ ] E. The code compiles but throws an exception at runtime.
    
- [ ] F. None of the above.
    

---### Q24. Pattern Ordering in Switch Expressions What is the output of the following code snippet?

Java

```
22: String zooStatus = "Closed";
23: int visitors = switch (zooStatus) {
24:     case String s when s.equals("Open") -> 10;
25:     case Object s when s != null && !s.equals("") -> 20;
26:     case null -> {yield 30;}
27: default -> 40;
28: };
29: System.out.print(visitors);
```

- [ ] A. 10
    
- [ ] B. 20
    
- [ ] C. 30
    
- [ ] D. 40
    
- [ ] E. Exactly one line does not compile.
    
- [ ] F. Exactly two lines does not compile.
    
- [ ] G. Three or more lines do not compile.
    

### Q25. Fall-Through Logic Tracking

What is the output of the following code snippet?

Java

```
6:  String instrument = "violin";
7:  final String CELLO = "cello";
8:  String viola = "viola";
9:  int p = -1;
10: switch (instrument) {
11:     case "bass" : break;
12:     case CELLO : p++;
13:     default: p++;
14:     case "VIOLIN": p++;
15:     case "viola" : ++p; break;
16: }
17: System.out.print(p);
```

- [ ] A. -1
    
- [ ] B. 0
    
- [ ] C. 1
    
- [ ] D. 2
    
- [ ] E. 3
    
- [ ] F. The code does not compile.
    

### Q26. Nested Loop Boundary Evaluations

What is the output of the following code snippet?

Java

```
9:  int w = 0, r = 1;
10: String name = "";
11: while (w < 2) {
12:     name += "A";
13:     do {
14:         name += "B";
15:         if (name.length() > 0) name += "C";
16:         else break;
17:     } while (r <= 1);
18:     r++; w++; }
19: System.out.println(name);
```

- [ ] A. ABC
    
- [ ] B. ABCABC
    
- [ ] C. ABCABCABC
    
- [ ] D. Line 15 contains a compilation error.
    
- [ ] E. Line 18 contains a compilation error.
    
- [ ] F. The code compiles but never terminates at runtime.
    
- [ ] G. The code compiles but throws a `NullPointerException` at runtime.
    

### Q27. Block Yield Logic in Switches

What is printed by the following code snippet?

Java

```
23: byte amphibian = 2;
24: String name = "Salamander";
25: String color = switch (amphibian) {
26:     case 1 -> { yield "Red"; }
27:     case 2 -> { if (name.equals("Frog")) yield "Green";
28:                 yield "Blue"; }
29: case 3 -> { yield "Purple"; }
30: default -> throw new RuntimeException();
31: };
32: System.out.print(color);
```

- [ ] A. Red
    
- [ ] B. Green
    
- [ ] C. Purple
    
- [ ] D. Blue
    
- [ ] E. The code does not compile.
    
- [ ] F. An exception is thrown at runtime.
    

### Q28. Pattern Variable Redefinition Scope

What is the output of calling `getFish("goldie")?`

Java

```
40: void getFish(Object fish) {
41:     if (!(fish instanceof String guppy))
42:         System.out.print("Eat!");
43:     else if (!(fish instanceof String guppy)) {
44:         throw new RuntimeException();
45:     }
46:     System.out.print("Swim!");
47: }
```

- [ ] A. Eat!
    
- [ ] B. Swim!
    
- [ ] C. Eat! followed by an exception
    
- [ ] D. Eat!Swim!
    
- [ ] E. An exception is printed
    
- [ ] F. None of the above.
    

### Q29. Prefix Increment Loop Trace

What is the result of the following code?

Java

```
1: public class PrintIntegers {
2:     public static void main(String[] args) {
3:         int y = -2;
4:         do System.out.print(++y + " ");
5:         while (y <= 5);
6:     } }
```

- [ ] A. -2 -1 0 1 2 3 4 5
    
- [ ] B. -2 -1 0 1 2 3 4
    
- [ ] C. -1 0 1 2 3 4 5 6
    
- [ ] D. -1 0 1 2 3 4 5
    

### Q30. Exhaustive Switch Patterns Check

What is the minimum number of lines that would need to be changed or removed for the following code to compile and return a value when called with `dance(10)`?

Java

```
41: double dance(Object speed) {
42:     return switch (speed) {
43:         case 5 -> {yield 4};
44:         case 10 -> 8;
45:         case 15,20 -> 12;
46:         default -> 20;
47:         case null -> 16;
48:     }
49: }
```

- [ ] A. Zero, the code compiles and runs without issue.
    
- [ ] B. One
    
- [ ] C. Two
    
- [ ] D. Three
    
- [ ] E. Four
    
- [ ] F. Five
    
- [ ] G. Six