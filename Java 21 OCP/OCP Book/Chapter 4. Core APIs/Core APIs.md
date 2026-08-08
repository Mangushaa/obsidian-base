
## Working with string

##### Concatenating string
```
System.out.println("c" + null); // cnull
int += string // do not works
string += int // works
```


##### String methods

###### Substring
```
public String substring(int beginIndex)
public String substring(int beginIndex, int endIndex) // endIndex not incuded, so potentially can be last index +1

var name = "animals";
System.out.println(name.substring(3, 3)); // empty string
System.out.println(name.substring(3, 2)); // exception
System.out.println(name.substring(3, 7)); // mals
System.out.println(name.substring(3, 8)); // exception
```

###### IndexOf
```
public int indexOf(int ch)
public int indexOf(int ch, int fromIndex)
public int indexOf(int ch, int fromIndex, int endIndex)
public int indexOf(String str)
public int indexOf(String str, int fromIndex)
public int indexOf(String str, int fromIndex, int endIndex)


10: var name = "animals";
11: System.out.println(name.indexOf('a')); // 0
12: System.out.println(name.indexOf("al")); // 4
13: System.out.println(name.indexOf('a', 4)); // 4
14: System.out.println(name.indexOf("al", 5)); // -1
15: System.out.println(name.indexOf('a', 2, 4)); // -1
16: System.out.println(name.indexOf("al", 2, 6)); // 4
```

##### Searching for Substrings

```
public boolean startsWith(String prefix)
public boolean startsWith(String prefix, int fromIndex)
public boolean endsWith(String suffix)
public boolean contains(CharSequence charSeq)
```

##### Replacing value
```
public String replace(char oldChar, char newChar)
public String replace(CharSequence target, CharSequence
replacement)
```

###### Removing whitespaces
```
public String strip()
public String stripLeading()
public String stripTrailing()
public String trim()
```

###### Working with Indentation
When working with text blocks e.g """...""" it helps to add remove whitespace to each line.

```
public String indent(int numberSpaces) // add spaces to beginnning of each line if 'numberSpaces' is positive, or removes if negative.
 
public String stripIndent() // remove all leading whitespace (removes maximum amount of common whitespaces, check next example) !!!! NOT PERFORM NORMALIZATION AS INDENT
```

**NOTE!!!**: Indent also doing normalization of string, it means it adds line break to the end of block if was not there. Check next example!!!. + converts line breaks to '/n' event cause of OS it was not /n but /r/n for example.

```
var block = """
			a
			 b
			c"""
			
block.length() // 6 - cause 3 letters(3) + whitespace before 'b'(1) + 2 line breaks after 'a' and 'b'(2); 3 + 1 + 2

block.indent(1).length() // 10 - Prvios 6 + each line space (3) + line break in the end and it was no there (1) = 6 + 3 + 1 = 10 (BECAUSE OF MENTIONE NORMALIZATION)

---------------------------------------------------------------------------

var concat = " a\n"
    + "  b\n"
    + " c";

concat.length() // 9 - line1 (3) + line2 (4) line3 (2) = 9

concat.stripIndent() // 6 - remove single leading whitespace on each line, line2 has 2 leading whitespace but we remove only common ones and line1, line3 has only1. 

 
```

##### Checking for Empty or Blank Strings

```
public boolean isEmpty() // check if string.length() > 0
public boolean isBlank() // check if string.length() > 0 && all symbol not whitespace
```

##### Formatting

```
static format
not static formatted
```

**NOTE:** if passing wrong values to placholders e.g %d 45.32 will throw IllegalArgumentException
**NOTE:** for floating values can use '%12.1f' to specify total amount of symbols, and amount of symbols after '.' in this example total length 12 (will add trailing 0 if needed) and 1 after '.'


## String builder

**NOTE:** default capacity 16
**NOTE**: equals not implement underhood == is checkd, so toString needs to be called first.

```
sb.delete(offset, length); // if length will exceed string length will just remote everything to end, no exception 

sb.deleteCharAt(5); // if exceed length - exception is thrown
```

```
public StringBuilder replace(int startIndex, int endIndex,
String newString)
```
**NOTE**: delete values from startIndex to before endIndex after inserts newString instead; 
**NOTE**: if endIndex > length just replace to the end

## String Equality

String pool when using constant, is any of vars is computed in runtime pool not used. If expression is compile computable e.g "str" + "ing' it will also use pool.

```
var x = "Hello World";
var z = "Hello World";
System.out.println(x == z); // true

var x = "Hello World";
var z = " Hello World".trim();
System.out.println(x == z); // false

!!!! .intern will put value into string pool, or fetch if already there

var name = "Hello World";
var name2 = new String("Hello World").intern();
System.out.println(name == name2); // true
```


## Arrays

**NOTE**: arr.equals calls == to compare elements Arrays.equals(arr1, arr2) needs to be used

```
int[] moreNumbers = new int[] {42, 55, 99}; // int array [3]
int[] moreNumbers = {42, 55, 99}; // anonymous int array [3]

int[] numAnimals;
int [] numAnimals2;
int []numAnimals3;
int numAnimals4[];
int numAnimals5 [];

// All correct above

int[] ids, types; // two int[] vars

int ids[], types; // first int [], second just int
```

```
String[] strings = { "stringValue" };
Object[] objects = strings;
String[] againStrings = (String[]) objects;
againStrings[0] = new StringBuilder(); // DOES NOT COMPILE
objects[0] = new StringBuilder(); // ArrayStoreException

```

##### Array search

```
Arrays.binarySearch(Object[] arr, Object[] key) // can be used only on sorted arrays
```

**NOTE:** Throws:ClassCastException – if the search key is not comparable to the elements of the array.

**NOTE:** Can be used only on sorted arrays

**NOTE:** Returns index if element is found, if not returns index where it should be placed to 
preserve order - 1. So if element should be inserted into index 0, will return -1. 1:-2, 2:-3 etc.

**NOTE:** If array is not sorted result is not predictable.


##### Comparing arrays
```
Arrays.compare(arr1, arr2) //
- Is same as compare first 2 differ elements 1,2,3 < 2,2,3
- 1,2,3 < 1,2,3,4  
- 1,2,3 = 1,2,3
- null is smaller than any other value.
- For strings/characters, numbers are smaller than letters.
- For strings/characters, uppercase is smaller than lowercase.
```

```
Arrays.mismatch(arr1, arr2);

If the arrays are equal, mismatch() returns -1. Otherwise, it
returns the first index where they differ.
```

##### Multidimensional Arrays

```
int[][] vars1; // 2D array
int vars2 [][]; // 2D array
int[] vars3[]; // 2D array
int[] vars4 [], space [][]; // 2D and 3D arrays
```


## Calculating with Math API
```
Math.roung(double:float) // round to value without 

NOTE: .5 is round up, else down

Math.ceil(double) // round value up e.g 3.14 -> 4
Math.floor(double) // round value down e.g 3.14 -> 3

double Math.random() // returns double value >= 0 && < 1
```

##### BitInteger and BigDecimal

**NOTE:** Both are immutable
**NOTE**: you can pass a long to either type, but a double only to BigDecimal.


## Working with dates and times

**NOTE**: All date time classes are immutable

**NOTE**: All date time classes have private constructors, so you need to use factory method 'of'

**NOTE**: All date time classes except of ZonedDateTime can accept MONTH enum as month and int value, but ZonedDateTime only int.

**NOTE**: If wrong number is passed to date time value, DateTimeException is thrown

##### Manipulating Dates and Times

```
date = date.plusDays(2); // plusWeeks, plusMonths, plusYears

dateTime.plusHours(1); // minutes, seconds...

same with minus


var date = LocalDate.of(2025, Month.FEBRUARY, 20); // 2025-02-20
var differentDay = date.withDayOfMonth(15); // 2025-02-15
var differentMonth = date.withDayOfYear(3); // 2025-01-03
var allChanged = date.withYear(2026)
                     .withMonth(4).withDayOfMonth(10); // 2026-04-10


var date = LocalDate.of(2025, Month.MARCH, 3);
var withTime = date.atTime(5, 30); // 2025-03-03T05:30
var start = date.atStartOfDay(); // 2025-03-03T00:00
```

**Converting between different date types**

LocalDate -> LocalDateTime: 
 - atTime(int hour, int minute)
 - atTime(int hour, int minute, int second)
 - atTime(int hour, int minute, int second, int nanos)
 - atTime(LocalTime time)
 
LocalTime -> LocalDateTime
- atDate(LocalDate date)

LocalDateTime -> ZonedDateTime:
- atZone(ZoneId zoneId)

##### Working with periods

**NOTE:** Period is used only with dates (YEAR, MONTH, DAY), not time, for time we have Duration

```
Period.of(years, month, days)

var wrong = Period.ofYears(1).ofWeeks(1); // every week
Above is save as
var wrong = Period.ofYears(1);
wrong = Period.ofWeeks(1);



Period.between(LocalDate, LocalDate) 
var xmas = LocalDate.of(2025, Month.DECEMBER, 25);
var newYears = LocalDate.of(2026, Month.JANUARY, 1);
System.out.println(Period.between(xmas, newYears)); // P7D
System.out.println(Period.between(newYears, xmas)); // P-7D
```

##### Working with Durations

**NOTE**: with duration we can use units from DAY to Nanos

```
There are dedicated factory methods as 
ofSeconds, ofMinutes, ofNanos, ofMillis

but also there are generic factory method as 

var daily = Duration.of(1, ChronoUnit.DAYS);
var hourly = Duration.of(1, ChronoUnit.HOURS);
var everyMinute = Duration.of(1, ChronoUnit.MINUTES);
var everyTenSeconds = Duration.of(10, ChronoUnit.SECONDS);
var everyMilli = Duration.of(1, ChronoUnit.MILLIS);
var everyNano = Duration.of(1, ChronoUnit.NANOS);


date.plus(duration)); // UnsupportedTemporalTypeException
```


##### Chrono units
**NOTE**: ChronoUnit also includes some convenient units such as ChronoUnit.HALF_DAYS to represent 12 hours.

```
var one = LocalTime.of(5, 15);
var two = LocalTime.of(6, 55);
var date = LocalDate.of(2025, 1, 20);
System.out.println(ChronoUnit.HOURS.between(one, two)); // 1
System.out.println(ChronoUnit.MINUTES.between(one, two)); // 100
System.out.println(ChronoUnit.MINUTES.between(one, date)); // DateTimeException


LocalTime time = LocalTime.of(3,12,45);
System.out.println(time); // 03:12:45
LocalTime truncated = time.truncatedTo(ChronoUnit.MINUTES);
System.out.println(truncated); // 03:12
```

##### Working with Instants
**NOTE**: You cannot convert a LocalDateTime to an Instant. Remember that an Instant is a point in time. A LocalDateTime does not contain a time zone, and it is therefore not universally recognized around the world as the same moment in time.