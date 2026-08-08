### 1. Which of the following can be inserted on line 8 to make this code compile? (Choose all that apply.)

Java

```
7: public void whatHappensNext() throws IOException {
8: // INSERT CODE HERE
9: }
```

- [ ] A. `System.out.println("it’s ok");`
    
- [ ] B. `throw new Exception();`
    
- [ ] C. `throw new IllegalArgumentException();`
    
- [ ] D. `throw new java.io.IOException();`
    
- [ ] E. `throw new RuntimeException();`
    
- [ ] F. `None of the above`
    

### 2. Which statement about the following class is correct?

Java

```
1: class Problem extends Exception {
2: public Problem() {}
3: }
4: class YesProblem extends Problem {}
5: public class MyDatabase {
6: public static void connectToDatabase() throw Problem {
7: throws new YesProblem();
8: }
9: public static void main(String[] c) throw Exception {
10: connectToDatabase();
11: }
12: }
```

- [ ] A. The code compiles and prints a stack trace for YesProblem at runtime.
    
- [ ] B. The code compiles and prints a stack trace for Problem at runtime.
    
- [ ] C. The code does not compile because Problem defines a constructor.
    
- [ ] D. The code does not compile because YesProblem does not define a constructor.
    
- [ ] E. The code does not compile but would if Problem and YesProblem were switched on lines 6 and 7.
    
- [ ] F. None of the above.
    

### 3. Which of the following are common types to localize? (Choose all that apply.)

- [ ] A. Dates
    
- [ ] B. Lambda expressions
    
- [ ] C. Class names
    
- [ ] D. Currency
    
- [ ] E. Numbers
    
- [ ] F. Variable names
    

### 4. What is the output of the following snippet, assuming a and b are both 0?

Java

```
3: try {
4: System.out.print(a / b);
5: } catch (RuntimeException e) {
6: System.out.print(-1);
7: } catch (ArithmeticException e) {
8: System.out.print(0);
9: } finally {
10: System.out.print("done");
11: }
```

- [ ] A. -1
    
- [ ] B. 0
    
- [ ] C. done-1
    
- [ ] D. done0
    
- [ ] E. The code does not compile.
    
- [ ] F. An uncaught exception is thrown.
    
- [ ] G. None of the above.
    

### 5. Assuming the current locale uses dollars ($) and the following method is called with a double value of 100_102.2, which of the following values are printed? (Choose all that apply.)

Java

```
public void print(double t) {
    System.out.print(NumberFormat.getCompactNumberInstance().format(t));
    System.out.print(NumberFormat.getCompactNumberInstance(Locale.getDefault(), Style.SHORT).format(t));
    System.out.print(NumberFormat.getCurrencyInstance().format(t));
}
```

- [ ] A. 100
    
- [ ] B. $100,000.00
    
- [ ] C. 100K
    
- [ ] D. 100 thousand
    
- [ ] E. 100M
    
- [ ] F. $100,102.20
    
- [ ] G. None of the above
    

### 6. What is the output of the following code?

Java

```
LocalDate date = LocalDate.parse("2025-04-30", DateTimeFormatter.ISO_LOCAL_DATE_TIME);
System.out.println(date.getYear() + " " + date.getMonth() + " "+ date.getDayOfMonth());
```

- [ ] A. 2025 APRIL 2
    
- [ ] B. 2025 APRIL 30
    
- [ ] C. 2025 MAY 2
    
- [ ] D. The code does not compile.
    
- [ ] E. A runtime exception is thrown.
    

### 7. What does the following method print?

Java

```
11: public void tryAgain(String s) {
12: try (FileReader r = null, p = new FileReader("")) {
13: System.out.print("X");
14: throw new IllegalArgumentException();
15: } catch (Exception s) {
16: System.out.print("A");
17: throw new FileNotFoundException();
18: } finally {
19: System.out.print("O");
20: }
21: }
```

- [ ] A. XAO
    
- [ ] B. XOA
    
- [ ] C. One line of this method contains a compiler error.
    
- [ ] D. Two lines of this method contain compiler errors.
    
- [ ] E. Three or more lines of this method contain compiler errors.
    
- [ ] F. The code compiles, but a NullPointerException is thrown at runtime.
    
- [ ] G. None of the above.
    

### 8. Assume that all of the files mentioned in the answer choices exist and define the same keys. Which one will be used to find the key in line 8?

Java

```
6: Locale.setDefault(Locale.of("en", "US"));
7: var b = ResourceBundle.getBundle("Dolphins");
8: System.out.println(b.getString("name"));
```

- [ ] A. Dolphins.properties
    
- [ ] B. Dolphins_US.properties
    
- [ ] C. Dolphins_en.properties
    
- [ ] D. Whales.properties
    
- [ ] E. Whales_en_US.properties
    
- [ ] F. The code does not compile.
    

### 9. For what value of pattern will the following print `<005.21> <008.49> <1,234.0>`?

Java

```
String pattern = "____________________";
var message = DoubleStream.of(5.21, 8.49, 1234)
    .mapToObj(v -> new DecimalFormat(pattern).format(v))
    .collect(Collectors.joining("> <"));
System.out.println("<"+message+">");
```

- [ ] A. ##.#
    
- [ ] B. 0,000.0#
    
- [ ] C. #,###.0
    
- [ ] D. #,###,000.0#
    
- [ ] E. The code does not compile regardless of what is placed in the blank.
    
- [ ] F. None of the above.
    

### 10. Which scenario is the best use of an exception?

- [ ] A. An element is not found when searching a list.
    
- [ ] B. An unexpected parameter is passed into a method.
    
- [ ] C. The computer caught fire.
    
- [ ] D. You want to loop through a list.
    
- [ ] E. You don’t know how to code a method.
    

### 11. Which of the following exceptions must be handled or declared in the method in which they are thrown? (Choose all that apply.)

Java

```
class Apple extends RuntimeException {}
class Orange extends Exception {}
class Banana extends Error {}
class Pear extends Apple {}
class Tomato extends Orange {}
class Peach extends Throwable {}
```

- [ ] A. Apple
    
- [ ] B. Orange
    
- [ ] C. Banana
    
- [ ] D. Pear
    
- [ ] E. Tomato
    
- [ ] F. Peach
    

### 12. Which of the following changes, when made independently, would make this code compile? (Choose all that apply.)

Java

```
1: import java.io.*;
2: public class StuckTurkeyCage implements AutoCloseable {
3: public void close() throws IOException {
4: throw new FileNotFoundException("Cage not closed");
5: }
6: public static void main(String[] args) {
7: try (StuckTurkeyCage t = new StuckTurkeyCage()) {
8: System.out.println("put turkeys in");
9: }
10: } }
```

- [ ] A. Remove throws IOException from the declaration on line 3.
    
- [ ] B. Add throws Exception to the declaration on line 6.
    
- [ ] C. Change line 9 to `} catch (Exception e) {}`.
    
- [ ] D. Change line 9 to `} finally {}`.
    
- [ ] E. The code compiles as is.
    
- [ ] F. None of the above.
    

### 13. Which of the following are true statements about exception handling in Java? (Choose all that apply.)

- [ ] A. A traditional try statement without a catch block requires a finally block.
    
- [ ] B. A traditional try statement without a finally block requires a catch block.
    
- [ ] C. A traditional try statement with only one statement can omit the `{}`.
    
- [ ] D. A try-with-resources statement without a catch block requires a finally block.
    
- [ ] E. A try-with-resources statement without a finally block requires a catch block.
    
- [ ] F. A try-with-resources statement with only one statement can omit the `{}`.
    

### 14. Assuming `-g:vars` is used when the code is compiled to include debug information, what is the output of the following code snippet?

Java

```
var huey = (String)null;
Integer dewey = null;
Object louie = null;
if(louie == huey.substring(dewey.intValue())) {
    System.out.println("Quack!");
}
```

- [ ] A. A NullPointerException that does not include any variable names in the stack trace
    
- [ ] B. A NullPointerException naming huey in the stack trace
    
- [ ] C. A NullPointerException naming dewey in the stack trace
    
- [ ] D. A NullPointerException naming louie in the stack trace
    
- [ ] E. A NullPointerException naming huey and louie in the stack trace
    
- [ ] F. A NullPointerException naming huey and dewey in the stack trace
    
- [ ] G. None of the above
    

### 15. Which of the following, when inserted independently in the blank, use locale parameters that are properly formatted? (Choose all that apply.)

Java

```
import java.util.Locale;
public class ReadMap implements AutoCloseable {
    private Locale locale;
    private boolean closed = false;
    @Override public void close() {
        System.out.println("Folding map");
        locale = null;
        closed = true;
    }
    public void open() {
        this.locale = ____________;
    }
    public void use() {
        // Implementation omitted
    }
}
```

- [ ] A. Locale.of("xM")
    
- [ ] B. Locale.of("MQ", "ks")
    
- [ ] C. Locale.of("qw")
    
- [ ] D. Locale.of("wp", "VW")
    
- [ ] E. Locale.create("zp")
    
- [ ] F. new Locale.Builder().setLanguage("yw").setRegion("PM")
    
- [ ] G. The code does not compile regardless of what is placed in the blank.
    

### 16. Which of the following can be inserted into the blank to allow the code to compile and run without throwing an exception?

Java

```
var f = DateTimeFormatter.ofPattern("hh o'clock");
System.out.println(f.format(___________________.now()));
```

- [ ] A. ZonedTime
    
- [ ] B. LocalDate
    
- [ ] C. LocalTimestamp
    
- [ ] D. LocalTime
    
- [ ] E. The code does not compile regardless of what is placed in the blank.
    
- [ ] F. None of the above.
    

### 17. Which of the following statements about resource bundles are correct? (Choose all that apply.)

- [ ] A. All keys must be in the same resource bundle to be used.
    
- [ ] B. A resource bundle is loaded by calling the new ResourceBundle() constructor.
    
- [ ] C. Resource bundle values are always read using the Properties class.
    
- [ ] D. Changing the default locale lasts for only a single run of the program.
    
- [ ] E. If a resource bundle for a specific locale is requested, then the resource bundle for the default locale will not be used.
    
- [ ] F. It is possible to use a resource bundle for a locale without specifying a default locale.
    

### 18. What is the output of the following code?

Java

```
import java.io.*;
public class FamilyCar {
    static class Door implements AutoCloseable {
        public void close() {
            System.out.print("D");
        } 
    }
    static class Window implements Closeable {
        public void close() {
            System.out.print("W");
            throw new RuntimeException();
        } 
    }
    public static void main(String[] args) {
        var d = new Door();
        try (d; var w = new Window()) {
            System.out.print("T");
        } catch (Exception e) {
            System.out.print("E");
        } finally {
            System.out.print("F");
        } 
    } 
}
```

- [ ] A. TWF
    
- [ ] B. TWDF
    
- [ ] C. TWDEF
    
- [ ] D. TWF followed by an exception
    
- [ ] E. TWDF followed by an exception
    
- [ ] F. TWEF followed by an exception
    
- [ ] G. The code does not compile.
    

### 19. Suppose that we have the following three properties files and code. Which bundles are used on lines 8 and 9, respectively?

**Dolphins.properties**

Properties

```
name=The Dolphin
age=0
```

**Dolphins_en.properties**

Properties

```
name=Dolly
age=4
```

**Dolphins_fr.properties**

Properties

```
name=Dolly
```

**Code:**

Java

```
5: var fr = Locale.of("fr");
6: Locale.setDefault(Locale.of("en", "US"));
7: var b = ResourceBundle.getBundle("Dolphins", fr);
8: b.getString("name");
9: b.getString("age");
```

- [ ] A. Dolphins.properties and Dolphins.properties
    
- [ ] B. Dolphins.properties and Dolphins_en.properties
    
- [ ] C. Dolphins_en.properties and Dolphins_en.properties
    
- [ ] D. Dolphins_fr.properties and Dolphins.properties
    
- [ ] E. Dolphins_fr.properties and Dolphins_en.properties
    
- [ ] F. The code does not compile.
    
- [ ] G. None of the above.
    

### 20. What is printed by the following program?

Java

```
1: public class DriveBus {
2: public void go() {
3: System.out.print("A");
4: try {
5: stop();
6: } catch (ArithmeticException e) {
7: System.out.print("B");
8: } finally {
9: System.out.print("C");
10: }
11: System.out.print("D");
12: }
13: public void stop() {
14: System.out.print("E");
15: Object x = null;
16: x.toString();
17: System.out.print("F");
18: }
19: public static void main(String n[]) {
20: new DriveBus().go();
21: } }
```

- [ ] A. AE
    
- [ ] B. AEBCD
    
- [ ] C. AEC
    
- [ ] D. AECD
    
- [ ] E. AE followed by a stack trace
    
- [ ] F. AEBCD followed by a stack trace
    
- [ ] G. AEC followed by a stack trace
    
- [ ] H. A stack trace with no other output
    

### 21. Which change allows the following program to compile?

Java

```
1: public class AhChoo {
2: static class SneezeException extends Exception {}
3: static class SniffleException extends SneezeException {}
4: public static void main(String[] args) {
5: try {
6: throw new SneezeException();
7: } catch (SneezeException | SniffleException e) {
8: } finally {}
9: } }
```

- [ ] A. Add throws SneezeException to the declaration on line 4.
    
- [ ] B. Add throws Throwable to the declaration on line 4.
    
- [ ] C. Change line 7 to `} catch (SneezeException e) {`.
    
- [ ] D. Change line 7 to `} catch (SniffleException e) {`.
    
- [ ] E. Remove line 7.
    
- [ ] F. The code compiles correctly as is.
    
- [ ] G. None of the above.
    

### 22. What is the output of the following code?

Java

```
try {
    LocalDateTime book = LocalDateTime.of(2025, 4, 5, 12, 30, 20);
    System.out.print(book.format(DateTimeFormatter.ofPattern("m")));
    System.out.print(book.format(DateTimeFormatter.ofPattern("z")));
    System.out.print(DateTimeFormatter.ofPattern("y").format(book));
} catch (Throwable e) {}
```

- [ ] A. 4
    
- [ ] B. 30
    
- [ ] C. 402
    
- [ ] D. 3002
    
- [ ] E. 3002025
    
- [ ] F. 402025
    
- [ ] G. None of the above
    

### 23. Fill in the blank: A class that implements _________________ may be in a try-with-resources statement. (Choose all that apply.)

- [ ] A. AutoCloseable
    
- [ ] B. Resource
    
- [ ] C. Exception
    
- [ ] D. AutomaticResource
    
- [ ] E. Closeable
    
- [ ] F. RuntimeException
    
- [ ] G. Serializable
    

### 24. What is the output of the following program?

Java

```
public class SnowStorm {
    static class WalkToSchool implements AutoCloseable {
        public void close() {
            throw new RuntimeException("flurry");
        } 
    }
    public static void main(String[] args) {
        WalkToSchool walk1 = new WalkToSchool();
        try (walk1; WalkToSchool walk2 = new WalkToSchool()) {
            throw new RuntimeException("blizzard");
        } catch(Exception e) {
            System.out.println(e.getMessage() + " " + e.getSuppressed().length);
        }
        walk1 = null;
    } 
}
```

- [ ] A. blizzard 0
    
- [ ] B. blizzard 1
    
- [ ] C. blizzard 2
    
- [ ] D. flurry 0
    
- [ ] E. flurry 1
    
- [ ] F. flurry 2
    
- [ ] G. None of the above
    

### 25. Assuming U.S. currency is in dollars ($) and German currency is in euros (€), what is the output of the following program?

Java

```
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Locale.Category;

public record Wallet(double money) {
    private String openWallet() {
        Locale.setDefault(Category.DISPLAY, new Locale.Builder().setRegion("us").build());
        Locale.setDefault(Category.FORMAT, new Locale.Builder().setLanguage("en").build());
        return NumberFormat.getCurrencyInstance(Locale.GERMANY).format(money);
    }
    public void printBalance() {
        System.out.println(openWallet());
    }
    public static void main(String... unused) {
        new Wallet(2.4).printBalance();
    } 
}
```

- [ ] A. 2,40 €
    
- [ ] B. $2.40
    
- [ ] C. 2.4
    
- [ ] D. The code does not compile.
    
- [ ] E. None of the above.
    

### 26. Which lines can fill in the blank to make the following code compile? (Choose all that apply.)

Java

```
void rollOut() throws ClassCastException {}
public void transform(String c) {
    try {
        rollOut();
    } catch (IllegalArgumentException | ________________________) {
    }
}
```

- [ ] A. IOException a
    
- [ ] B. Error b
    
- [ ] C. NullPointerException c
    
- [ ] D. RuntimeException d
    
- [ ] E. NumberFormatException e
    
- [ ] F. ClassCastException f
    
- [ ] G. None of the above. The code contains a compiler error regardless of what is inserted into the blank.