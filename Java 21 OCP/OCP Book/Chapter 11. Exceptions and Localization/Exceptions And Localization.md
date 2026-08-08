**NOTE:** Checked exceptions also include any class that inherits Throwable but not Error or RuntimeException, such as a class that directly extends Throwable. For the exam, you just need to know about checked exceptions that extend Exception.

**NOTE:** In java it's possible to create array of size 0

```
String[] animals = new String[0];
```


```
3: try {
4: throw new RuntimeException();
5: throw new ArrayIndexOutOfBoundsException(); // DOES NOT COMPILE Unreachable code
6: } catch (Exception e) {}
```

```
class NoMoreCarrotsException extends Exception {}

public class Bunny {
   private void eatCarrot() {}
   public void bad() {
      try {
         eatCarrot();
      } catch (NoMoreCarrotsException e) { // DOES  NOT COMPILE eatCarrot do not throw checked exception NoMoreCarrotsException
         System.out.print("sad rabbit");
      }
   } 
}
```
![[Pasted image 20260628203659.png]]
![[Pasted image 20260628205217.png]]
![[Pasted image 20260628205313.png]]

## Applying a Multi-catch Block

```
catch(Exception1 e | Exception2 e | Exception3 e) // DOES NOT COMPILE 

catch(Exception1 e1 | Exception2 e2 | Exception3 e3) // DOES NOT COMPILE

catch(Exception1 | Exception2 | Exception3 e)

----------------------------------------------------------------

try {
   throw new IOException();
} catch (FileNotFoundException | IOException p) {} // DOES NOT COMPILE

Specifying related exceptions in the multi-catch is redundant, and the compiler gives a message such as this: The exception FileNotFoundException is already caught by the alternative IOException
```

## Finally

**NOTE:** When System.exit() is called in the try or catch block, the finally block does not run.

## Automating Resource Management
![[Pasted image 20260628221543.png]]

**NOTE:** Closeable extends AutoCloseable, they are both supported in try-with-resources statements. The only difference between the two is that Closeable’s close() method declares IOException, while AutoCloseable’s close() method declares Exception.

**NOTE:** When working with try-with-resources statements, it is important to know that resources are closed in the reverse of the order in which they are created. 

```
public static void main(String… xyz) {
   try (MyFileClass bookReader = new MyFileClass(1);
       MyFileClass movieReader = new MyFileClass(2)) {
          System.out.println("Try Block");
          throw new RuntimeException();
    } catch (Exception e) {
       System.out.println("Catch Block");
    } finally {
       System.out.println("Finally Block");
    } 
}
```
Try Block
Closing: 2
Closing: 1
Catch Block
Finally Block


**NOTE:** While resources are often created in the try-with-resources statement, it is possible to  declare them ahead of time, provided they are marked final or are effectively final. 

```
11: public static void main(String… xyz) {
12:    final var bookReader = new MyFileClass(4);
13:    MyFileClass movieReader = new MyFileClass(5);
14:    try (bookReader;
15:         var tvReader = new MyFileClass(6);
16:         movieReader) {
17:            System.out.println("Try Block");
18:    } finally {
19:       System.out.println("Finally Block");
20:    } 
}
```

```
31: var writer = Files.newBufferedWriter(path);
32: try (writer) { // DOES NOT COMPILE not final!!!
33:    writer.append("Welcome to the zoo!");
34: }
35: writer = null;
```

```
41: var writer = Files.newBufferedWriter(path);
42: writer.append("This write is permitted but a really bad
idea!");
43: try (writer) {
44: writer.append("Welcome to the zoo!");
45: }
46: writer.append("This write will fail!"); // IOException Writer is closed after 45 !!!!
``` 


## Understanding Suppressed Exceptions

**NOTE:** When multiple exceptions are thrown, all but the first are called suppressed exceptions. The idea is that Java treats the first exception as the primary one and tacks on any that come up while automatically closing.

```
public class JammedTurkeyCage implements AutoCloseable {
   public void close() throws IllegalStateException {
      throw new IllegalStateException("Cage door does not close");
   }
}

public static void main(String[] args) {
   try (JammedTurkeyCage t = new JammedTurkeyCage()) {
      throw new IllegalStateException("Turkeys ran off");
   } catch (IllegalStateException e) {
      System.out.println("Caught: " + e.getMessage());
      for (Throwable t: e.getSuppressed())
         System.out.println("Suppressed: "+ t.getMessage());
      } 
   }
}

Caught: Turkeys ran off 
Suppressed: Cage door does not close
```

```
5: public static void main(String[] args) {
6:    try (JammedTurkeyCage t = new JammedTurkeyCage()) {
7:       throw new RuntimeException("Turkeys ran off");
8:    } catch (IllegalStateException e) {
9:       System.out.println("caught: " + e.getMessage());
10:   } 
11: }
```

**NOTE:** Line 7 again throws the primary exception. Java calls the close() method and adds a suppressed exception. Line 8 would catch the IllegalStateException. However, we don’t have one of those. The primary exception is a RuntimeException. Since this does not match the catch clause, the exception is thrown to the caller. Eventually, the main() method would output something like the following: 

*Exception in thread "main" java.lang.RuntimeException: Turkeys ran off 
at JammedTurkeyCage.main(JammedTurkeyCage.java:7)
Suppressed: java.lang.IllegalStateException: Cage door does not close
at JammedTurkeyCage.close(JammedTurkeyCage.java:3)
at JammedTurkeyCage.main(JammedTurkeyCage.java:8)*

Java remembers the suppressed exceptions that go with a primary exception
even if we don’t handle them in the code.


**NOTE:**
If more than two resources throw an exception, the first one to be thrown becomes the primary exception, and the rest are grouped as suppressed exceptions. And since resources are closed in the reverse of the order in which they are declared, the primary exception will be on the last declared resource that throws an exception.

**NOTE:**  Suppressed exceptions apply only to exceptions thrown in the try clause. The following example does not throw a suppressed exception:
```
public static void main(String[] args) {
   try (JammedTurkeyCage t = new JammedTurkeyCage()) {
      throw new IllegalStateException("Turkeys ran off"); // 7
   } finally {
	   throw new RuntimeException("and we couldn't find them"); // 9
   }
}
```

Line 7 throws an exception. Then Java tries to close the resource and adds a suppressed exception to it. Now we have a problem. The finally block runs after all this. Since line 9 also throws an exception, the previous exception from line 7 is lost, with the code printing the following:

*Exception in thread "main" java.lang.RuntimeException: and we couldn’t find them
at JammedTurkeyCage.main(JammedTurkeyCage.java:9)*


## Formatting Values

```
java.text.NumberFormat

public final String format(double number)
public final String format(long number)
```

**NOTE:** NumberFormat is an abstract class, we need the concrete DecimalFormat class to use it.

![[Pasted image 20260629235034.png]]

```
12: double d = 1234.567;
13: NumberFormat f1 = new DecimalFormat("###,###,###.0");
14: System.out.println(f1.format(d)); // 1,234.6
15:
16: NumberFormat f2 = new DecimalFormat("000,000,000.00000");
17: System.out.println(f2.format(d)); // 000,001,234.56700
18:
19: NumberFormat f3 = new DecimalFormat("Your Balance $#,###,###.##");
20: System.out.println(f3.format(d)); // Your Balance $1,234.57
```

## Formatting Dates and Times

**NOTE:** Java provides a class called DateTimeFormatter to display standard formats.

```
LocalDate date = LocalDate.of(2025, Month.OCTOBER, 20);
LocalTime time = LocalTime.of(11, 12, 34);
LocalDateTime dt = LocalDateTime.of(date, time);
System.out.println(date.format(DateTimeFormatter.ISO_LOCAL_DATE));
System.out.println(time.format(DateTimeFormatter.ISO_LOCAL_TIME));
System.out.println(dt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
```

**NOTE:** The DateTimeFormatter will throw an exception if it encounters an incompatible type.

```
date.format(DateTimeFormatter.ISO_LOCAL_TIME); // RuntimeException
time.format(DateTimeFormatter.ISO_LOCAL_DATE); // RuntimeException
```

## Customizing the Date/Time Format

```
var f = DateTimeFormatter.ofPattern("MMMM dd, yyyy ’at’ hh:mm");
System.out.println(dt.format(f)); // October 20, 2025 at 11:12
```

![[Pasted image 20260630005151.png]]

**NOTE:** The date/time classes contain a format() method that will take a formatter, while the formatter classes contain a format() method that will take a date/time value.

```
var dateTime = LocalDateTime.of(2025, Month.OCTOBER, 20, 6, 15, 30);
var formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy
hh:mm:ss");
System.out.println(dateTime.format(formatter)); // 10/20/2025 06:15:30
System.out.println(formatter.format(dateTime)); // 10/20/2025 06:15:30
```

**NOTE:** What if you want your format to include some custom text values? If you just type them as part of the format String, the formatter will interpret each character as a date/time symbol.

- One way to address this would be to break the formatter into multiple smaller formatters and then concatenate the results.
```
var dt = LocalDateTime.of(2025, Month.OCTOBER, 20, 6, 15, 30);
var f1 = DateTimeFormatter.ofPattern("MMMM dd, yyyy ");
var f2 = DateTimeFormatter.ofPattern(" hh:mm");
System.out.println(dt.format(f1) + "at" + dt.format(f2));

// This prints October 20, 2025 at 06:15 at runtime.
```

- You can escape the text by surrounding it with a pair of single quotes (’).

```
var f = DateTimeFormatter.ofPattern("MMMM dd, yyyy ’at’
hh:mm");
System.out.println(dt.format(f)); // October 20, 2025 at 06:15
```

**NOTE:** what if you need to display a single quote in the output, too?  Java supports this by putting two single quotes (') next to each other.

```
var g1 = DateTimeFormatter.ofPattern("MMMM dd’, Party’’s at’ hh:mm");
System.out.println(dt.format(g1)); // October 20, Party’s at 06:15
var g2 = DateTimeFormatter.ofPattern("’System format, hh:mm: ’hh:mm");
System.out.println(dt.format(g2)); // System format, hh:mm: 06:15
var g3 = DateTimeFormatter.ofPattern("’NEW! ’yyyy’, yay!’");
System.out.println(dt.format(g3)); // NEW! 2025, yay!
```

**NOTE:** If you don’t escape the text values with single quotes, an exception will be thrown at runtime if the text cannot be interpreted as a date/time symbol.

```
DateTimeFormatter.ofPattern("The time is hh:mm"); //
IllegalArgumentException
```

This line throws an exception since T is an unknown symbol. The exam might also present you with an incomplete escape sequence.

```
DateTimeFormatter.ofPattern("’Time is: hh:mm: "); //
IllegalArgumentException
```

## Supporting Internationalization and Localization

### Picking a Locale

**NOTE:** While Oracle defines a locale as “a specific geographical, political, or cultural region,” you’ll only see languages and countries on the exam.

```
java.util.Locale

Locale locale = Locale.getDefault();
System.out.println(locale);
```
![[Pasted image 20260630020255.png]]

```
US // Cannot have country without language
enUS // Missing underscore
US_en // The country and language are reversed
EN // Language must be lowercase
```

**NOTE:** You do not need to memorize language or country codes. The exam will let you know about any that are being used. You do need to recognize valid and invalid formats. Pay attention to uppercase/lowercase and the
underscore. For example, if you see a locale expressed as es_CO, then you should know that the language is es and the country is CO, even if you didn’t know that they represent Spanish and Colombia, respectively.

```
System.out.println(Locale.GERMAN); // de
System.out.println(Locale.GERMANY); // de_DE
```

```
System.out.println(Locale.of("fr")); // fr
System.out.println(Locale.of("hi", "IN")); // hi_IN
```

```
Locale l1 = new Locale.Builder()
.setLanguage("en")
.setRegion("US")
.build();

Locale l2 = new Locale.Builder()
.setRegion("US")
.setLanguage("en")
.build();
```

**NOTE:** There’s actually a fourth way to create a Locale instance, using a Locale constructor, such as new Locale("en") or new Locale("en", "US"). These constructors are now deprecated, so use one of the three previous techniques instead.

```
System.out.println(Locale.getDefault()); // en_US
Locale locale = Locale.of("fr");
Locale.setDefault(locale);
System.out.println(Locale.getDefault()); // fr
```

## Localizing Numbers
![[Pasted image 20260630024051.png]]

**NOTE:** The format classes are not thread-safe. Do not store them in instance variables or static variables.

## Formatting with CompactNumberFormat
```
var formatters = Stream.of(
NumberFormat.getCompactNumberInstance(),
NumberFormat.getCompactNumberInstance(Locale.getDefault(), Style.SHORT),
NumberFormat.getCompactNumberInstance(Locale.getDefault(), Style.LONG),
NumberFormat.getCompactNumberInstance(Locale.GERMAN,
Style.SHORT), Style.LONG),
NumberFormat.getCompactNumberInstance(Locale.GERMAN,
NumberFormat.getNumberInstance());

7M
7M
7 million
7 Mio.
7 Millionen
7,123,456
```

**NOTE:** Notice that the first two lines are the same. If you don’t specify a style, SHORT is used by default.

- First it determines the highest range for the number, such as thousand (K), million (M), billion (B), or trillion (T).
- It then returns up to the first three digits of that range, rounding the last digit as needed.
- Finally, it prints an identifier. If SHORT is used, a symbol is returned. If LONG is used, a space followed by a word is returned.

## Localizing Dates
![[Pasted image 20260630025832.png]]

**NOTE:** Each method in the table takes a FormatStyle parameter (or two) with possible values SHORT, MEDIUM, LONG, and FULL.

```
public static void print(DateTimeFormatter dtf,
LocalDateTime dateTime, Locale locale) {
   System.out.println(dtf.format(dateTime) + " --- "
      + dtf.withLocale(locale).format(dateTime));
}


public static void main(String[] args) {
   Locale.setDefault(Locale.of("en", "US"));
   var italy = Locale.of("it", "IT");
   var dt = LocalDateTime.of(2025, Month.OCTOBER, 20, 15, 12, 34);
// 10/20/25 --- 20/10/25
print(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT), dt, italy);
// 3:12 PM --- 15:12
print(DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT), dt, italy);
// 10/20/25, 3:12 PM --- 20/10/25, 15:12
print(DateTimeFormatter.ofLocalizedDateTime( FormatStyle.SHORT, FormatStyle.SHORT), dt, italy);
}
```

## Specifying a Locale Category
![[Pasted image 20260630030152.png]]

```
public static void printCurrency(Locale locale, double money) {
   System.out.println(NumberFormat.getCurrencyInstance().format(money)
   + ", " + locale.getDisplayLanguage());
}
public static void main(String[] args) {
   var spain = Locale.of("es", "ES");
   var money = 1.23;
   // Print with default locale
   Locale.setDefault(Locale.of("en", "US"));
   printCurrency(spain, money); // $1.23, Spanish
   // Print with selected locale display
   Locale.setDefault(Category.DISPLAY, spain);
   printCurrency(spain, money); // $1.23, español
   // Print with selected locale format
   Locale.setDefault(Category.FORMAT, spain);
   printCurrency(spain, money); // 1,23 €, español
}
```

## Loading Properties with Resource Bundles

Zoo_fr.properties

The filenames match the name of our resource bundle, Zoo. They are then followed by an underscore (_), target locale, and .properties file extension. 

```
10: public static void printWelcomeMessage(Locale locale) {
11:    var rb = ResourceBundle.getBundle("Zoo", locale);
12:       System.out.println(rb.getString("hello")
13:       + ", " + rb.getString("open"));
14: }
15: public static void main(String[] args) {
16:    var us = Locale.of("en", "US");
17:    var france = Locale.of("fr", "FR");
18:    printWelcomeMessage(us); // Hello, The zoo is open
19:    printWelcomeMessage(france); // Bonjour, Le zoo est ouvert
20: }


var us = Locale.of("en", "US");
ResourceBundle rb = ResourceBundle.getBundle("Zoo", us);
rb.keySet().stream()
.map(k -> k + ": " + rb.getString(k))
.forEach(System.out::println);
```

## Picking a Resource Bundle
```
ResourceBundle.getBundle("name");
ResourceBundle.getBundle("name", locale);
```
![[Pasted image 20260630162418.png]]

```
Zoo.properties
name=Vancouver Zoo

Zoo_en.properties
hello=Hello
open=is open

Zoo_en_US.properties
name=The Zoo

Zoo_en_CA.properties
visitors=Canada visitors

------------------------------------------------------------------

10: Locale.setDefault(Locale.of("en", "US"));
11: var locale = Locale.of("en", "CA");
12: ResourceBundle rb = ResourceBundle.getBundle("Zoo",
locale);
13:
14: System.out.print(rb.getString("hello"));
15: System.out.print(". ");
16: System.out.print(rb.getString("name"));
17: System.out.print(" ");
18: System.out.print(rb.getString("open"));
19: System.out.print(" ");
20: System.out.print(rb.getString("visitors"));

// Hello. Vancouver Zoo is open Canada visitors
```

**NOTE:** After line 12, the resource bundle is selected, and Java will only consider files it finds that are part of this resource bundle, namely Zoo_en_CA.properties, Zoo_en.properties, and Zoo.properties, in this order.

**NOTE:** if a property is not found in any resource bundle, then an exception is thrown. MissingResourceException

## Formatting Messages

```
helloGreeting=Hello, {0} and {1}

String greeting = rb.getString("helloGreeting");
System.out.print(MessageFormat.format(greeting, "Tammy",
"Henry"));

// Hello, Tammy and Henry
```

## Using the Properties Class

```
import java.util.Properties;
public class ZooOptions {
   public static void main(String[] args) {
      var props = new Properties();
      props.setProperty("name", "Our zoo");
      props.setProperty("open", "10am");
   }
}


System.out.println(props.getProperty("camel")); // null
System.out.println(props.getProperty("camel", "Bob")); // Bob


props.get("open"); // 10am
props.get("open", "The zoo will be open soon"); // DOES NOT COMPILE
```

**NOTE:** The Properties class also includes a get() method, but only
getProperty() allows for a default value.