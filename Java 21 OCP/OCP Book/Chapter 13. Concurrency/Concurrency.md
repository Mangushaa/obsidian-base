**NOTE:** The priority can be set from 1 (Thread.MIN_PRIORITY) to 10 (Thread.MAX_PRIORITY)

![[Pasted image 20260630220751.png]]

**NOTE:** The priority for virtual threads is always 5
(Thread.NORM_PRIORITY) and cannot be changed. Calling setPriority() on the newly created virtual Thread has no effect.

**NOTE:** To assign task to thread without starting it can be done with unstarted(task)

```
Thread t = Thread.ofVirtual().unstarted(task);
t.start();
```

## Working with Daemon Threads

**NOTE:** A daemon thread is one that will not prevent the JVM from exiting when the program finishes. 

```
1: public class Zoo {
2: public static void pause() { // Defines
the thread task
3:    try {
4:       Thread.sleep(10_000); // Wait for 10 seconds
5:    } catch (InterruptedException e) {}
6:    System.out.println(“Thread finished!”);
7: }
8:
9: public static void main(String[] unused) {
10:    var job = Thread.ofPlatform().start(Zoo::pause);
11:    System.out.println(“Main method finished!”);
12: } 
}

// If thread not marked as deamon prints:
Main method finished!
Thread finished!



// Else if deamon

var job = 
Thread.ofPlatform().daemon(true).start(Zoo::pause);
Main method finished!


!!NOTE an `InterruptedException` will not be thrown or handled in deamon thread.
```


**NOTE:** Virtual threads are always daemons. Platform threads default to non-daemon but can be changed.

## Thread lifecycle

![[Pasted image 20260630224952.png]]


**NOTE:** Once a thread enters a waiting state, another thread can call interrupt() on the thread, causing it to move back to a RUNNABLE state and clears its internal "interrupted" flag (resetting it to `false`). Most methods that cause a thread to wait also declare InterruptedException.

```
var thread = Thread.ofPlatform().start(() -> {
	try {
	   Thread.sleep(1000);
	} catch (InterruptedException e) {
    System.out.println(“Interrupted!”);
}});

thread.interrupt();
```

This code prints Interrupted! and then resumes running. What if interrupt() is called on a thread that is already in the RUNNABLE state? In this case, an exception won’t be thrown. 

## Creating Threads with the Concurrency API

**NOTE:** You can submit tasks to an ExecutorService instance multiple ways. 
![[Pasted image 20260630230413.png]]

**NOTE:** Default implementation of Future is FutureTask class from java.uril.concurrency

![[Pasted image 20260630230805.png]]

**NOTE:** The ExecutorService submit() method takes a Runnable and returns a Future{?} object. This object can be used to check if the thread is done. But, since Runnable tasks have a return type of void, calling get() on such a Future will always return null upon successful completion of the task.


## Future internal work not for exam

1. State Verification and Atomic Update (CAS)

Under the hood, a `FutureTask` acts as a state machine. It has an internal state variable (historically managed via `Unsafe` or `VarHandle` for atomic operations). The task starts in a `NEW` state.

When `cancel()` is called, the very first thing it does is check if the task is still in the `NEW` state.

- If the task is already `COMPLETED`, `CANCELLED`, or `EXCEPTIONAL`, the method does nothing and immediately returns `false`.
    
- If the task is `NEW`, it uses a Compare-And-Swap (CAS) operation to atomically change the state.
    
    - If `mayInterruptIfRunning` is **`false`**, it changes the state from `NEW` to **`CANCELLED`**.
        
    - If `mayInterruptIfRunning` is **`true`**, it changes the state from `NEW` to **`INTERRUPTING`**.
        
### 2. Thread Interruption (If Requested)

This is where the boolean parameter `mayInterruptIfRunning` becomes critical, and it ties directly into how `InterruptedException` works (as discussed in your previous question).

**If `cancel(false)` was called:**

- The JVM does absolutely nothing to the thread executing the task.
    
- If the task hasn't started yet, it will simply be removed from the queue and will never run.
    
- If the task is _already running_, it will continue to run to completion, oblivious to the fact that it was cancelled. However, the `Future` object itself is marked as cancelled, so any attempt to get its result will fail.
    

**If `cancel(true)` was called:**

- The `FutureTask` looks up the specific thread that is currently executing the `run()` method of this task (stored internally as the `runner` variable).
    
- It calls `runner.interrupt()`.
    
- As you now know, if that thread is currently sleeping, waiting, or blocked, it will instantly throw an `InterruptedException`. If it is just doing normal CPU work, its internal interrupt flag is set to `true`, and it's up to the developer's code to check `Thread.currentThread().isInterrupted()` and stop gracefully.
    
- After calling `interrupt()`, the task state is updated from `INTERRUPTING` to **`INTERRUPTED`**.    
### Summary of the "Under the Hood" Flow

1. Check if state is `NEW`. Return `false` if not.
    
2. CAS state to `INTERRUPTING` (if true) or `CANCELLED` (if false).
    
3. If true, call `interrupt()` on the executing Thread. CAS state to `INTERRUPTED`.
    
4. Wake up all threads waiting on `Future.get()`, causing them to throw `CancellationException`.
    

Would you like to see a code example demonstrating how to write a task that properly responds to `cancel(true)` vs `cancel(false)`?

If a task has been interrupted (because `cancel()` was called on its `Future`), it will not return a result. Any subsequent attempt to call `get()` on that `Future` will immediately throw a `java.util.concurrent.CancellationException`.

**NOTE:** When you call `Future.get()` on a task that is in the `EXCEPTIONAL` state, the `FutureTask` retrieves the stored exception, wraps it inside a **`java.util.concurrent.ExecutionException`**, and throws it back to the thread that called `get()`.



## Investigating Callable

```
@FunctionalInterface public interface Callable<V> {
   V call() throws Exception;
}
```

## Shutting Down a Thread Executor

**NOTE:** A thread executor creates a non-daemon thread on the first task that is executed, so forgetting to do this will result in your application never terminating. 
![[Pasted image 20260630232405.png]]
![[Pasted image 20260630232554.png]]

## Scheduling Tasks
ScheduledExecutorService, which is a subinterface of ExecutorService, can be used for just such a task.
![[Pasted image 20260630232724.png]]

- scheduleAtFixedRate - It triggers the task based on a strict schedule, regardless of how long the previous execution took.

- scheduleWithFixedDelay - It guarantees a strict amount of rest time _between_ the end of one execution and the start of the next.

**NOTE:** the methods return a ScheduledFuture instance. The ScheduledFuture interface is identical to the Future interface, except that it includes a getDelay() method that returns the remaining delay. 

**NOTE:** While these tasks are scheduled in the future, the actual execution may be delayed. For example, there may be no threads available to perform the tasks, at which point they will just wait in the queue. Also, if the ScheduledExecutorService has completely shut down by the time the scheduled task execution time is reached, then these tasks will be discarded.

## Increasing Concurrency with Pools
![[Pasted image 20260630233659.png]]

## Writing Thread-Safe Code

## Protecting Data with Atomic Classes

```
java.util.concurrent.atomic
```

![[Pasted image 20260701233407.png]]
![[Pasted image 20260701233433.png]]

**NOTE:** ReentrantLock not implements autoclosable, so finally should be used
## Improving Access with synchronized Blocks

## Understanding the Lock Framework

**NOTE:** If you need to control the order threads run, you can use the ReentrantLock constructor that takes a single boolean “fairness” parameter. 

**NOTE:** Besides always making sure to release a lock, you also need to be sure that you only release a lock that you have. If you attempt to release a lock that you do not have, you will get an exception at runtime.

```
var lock = new ReentrantLock();
lock.unlock(); // IllegalMonitorStateException
```

![[Pasted image 20260702004054.png]]

**NOTE:** The ReentrantLock class maintains a counter of the number of times a lock has been successfully granted to a thread. To release the lock for other threads to use, unlock() must be called the same number of times the lock was granted.

**NOTE:** ReentrantReadWriteLock includes separate locks for reading and writing data. At runtime, only one thread can hold the write lock at a time, but many threads can hold the read lock. In scope of one thread we can obtain write lock and then read lock, but not opposite.

- **Read Lock (Shared):** Multiple threads can hold the read lock simultaneously, as long as no thread holds the write lock. Reading doesn't modify data, so it's safe to share.
    
- **Write Lock (Exclusive):** Only one thread can hold the write lock. When a thread has the write lock, no other thread can get a read _or_ write lock. Modifying data requires exclusive access.
  
- **Lock Downgrading is allowed:** If a thread holds a _write_ lock, it can acquire a _read_ lock and then release the write lock. This is called downgrading, and it's perfectly valid.
    
- **Lock Upgrading is NOT allowed:** If a thread holds a _read_ lock and tries to acquire a _write_ lock without releasing the read lock first, it will result in a **deadlock** (the thread will block forever waiting for itself to release the read lock).


```
var lock = new ReentrantReadWriteLock();
lock.writeLock().lock();
lock.readLock().lock();
System.out.println(lock.isWriteLocked()); // true
System.out.println(lock.getReadLockCount()); // 1
lock.writeLock().unlock();
System.out.println(lock.isWriteLocked()); // false
System.out.println(lock.getReadLockCount()); // 1
lock.readLock().unlock();
System.out.println(lock.getReadLockCount()); // 0
```

```
var lock = new ReentrantReadWriteLock();
lock.readLock().lock();
lock.writeLock().lock(); // Wait forever
```

## Orchestrating Tasks with a CyclicBarrier

**NOTE:** After a CyclicBarrier limit is reached (aka the barrier is broken), all threads are released, and the number of threads waiting on the CyclicBarrier goes back to zero. At this point, the CyclicBarrier may be used again for a new set of waiting threads. For example, if our CyclicBarrier limit is 5 and we have 15 threads that call await(), the CyclicBarrier will be activated a total of three times.

## Using Concurrent Collections

**NOTE:** The purpose of the concurrent collection classes is to solve common memory consistency errors. A memory consistency error occurs when two threads have inconsistent views of what should be the same data. Conceptually, we want writes on one thread to be available to another thread if it accesses the concurrent collection after the write has occurred.

**NOTE:** When two threads try to modify the same nonconcurrent collection, the JVM may throw a ConcurrentModificationException at runtime.

**NOTE:** You should use a concurrent collection class any time you have multiple threads modify a collection outside a synchronized block or method, even if you don’t expect a concurrency problem. 

**NOTE:** If the collection is immutable (and contains immutable objects), the concurrent collections are not necessary. Immutable objects can be accessed by any number of threads and do not require synchronization. By definition, they do not change, so there is no chance of a memory consistency error.

![[Pasted image 20260702014715.png]]

**NOTE:** The Skip classes might sound strange, but they are just “sorted” versions of the associated concurrent collections. When you see a class with Skip in the name, just think “sorted concurrent” collections, and the rest should follow naturally.

**NOTE:** The CopyOnWrite classes behave a little differently than the other concurrent data structures you have seen. These classes create a copy of the collection any time a reference is added, removed, or changed in the collection and then update the original collection reference to point to the
copy. These classes are commonly used to ensure an iterator doesn’t see modifications to the collection.

```
List<Integer> favNumbers = new CopyOnWriteArrayList<>(List.of(4, 3, 42));
for (var n : favNumbers) {
   System.out.print(n + " "); // 4 3 42
   favNumbers.add(n + 1);
}
System.out.println();
System.out.println("Size: " + favNumbers.size()); // Size: 6
```

**NOTE:** Despite adding elements, the iterator is not modified, and the loop executes exactly three times. Alternatively, if we had used a regular ArrayList object, a ConcurrentModificationException would have been thrown at
runtime. The CopyOnWrite classes can use a lot of memory, since a new collection structure is created any time the collection is modified. Therefore, they are commonly used in multithreaded environment situations where reads are far more common than writes.

**NOTE:** Finally, Table 13.12 includes LinkedBlockingQueue, which implements the concurrent BlockingQueue interface. This class is just like a regular Queue, except that it includes overloaded versions of offer() and poll() that take a timeout. These methods wait (or block) up to a specific amount of time to complete an operation.

## Obtaining Synchronized Collections
![[Pasted image 20260702015135.png]]

**NOTE:** **Yes, it absolutely will be mirrored.** When you use any of the methods in that table (like `Collections.synchronizedList(originalList)`), Java does **not** create a new, separate copy of your data. Instead, it creates a lightweight **wrapper object** that delegates all of its reads and writes directly to your original collection. They are looking at and modifying the exact same data in memory.

## Identifying Threading Problems

**NOTE:**  Liveness problems, then, are those in which the application becomes unresponsive or is in some kind of “stuck” state. More precisely, liveness problems are often the result of a thread entering a BLOCKING or WAITING state forever, or repeatedly entering/exiting these states. For the
exam, there are three types of liveness issues with which you should be familiar: deadlock, starvation, and livelock.

## Working with Parallel Streams

**NOTE:** To generate random numbers in a multithreaded program, you use the ThreadLocalRandom class

```
ThreadLocalRandom.current()
.ints()
.limit(5)
.forEach(System.out::println); // Prints 5 random ints
```

- ints(): Infinite stream of any int values
- ints(lowestInclusive, highestExclusive): Unlimited stream
  of int values between the two parameters, excluding the second one
- ints(numberIntsToInclude): Finite stream of the requested
  number of int values
- ints(numberIntsToInclude, lowestInclusive, highestExclusive): Finite stream of the requested number of int values between the two parameters, excluding the second one
- nextInt(highestExclusive): Single int between 0 and the
  parameter, not including the parameter
- nextInt(lowestInclusive, highestExclusive): Single int
  between the first parameter and the second parameter, not
  including the second parameter

**NOTE:** Similar methods are available for doubles and longs, such doubles(), nextDouble(), longs(), nextLong(), etc.


## Creating Parallel Streams

```
Collection<Integer> collection = List.of(1, 2);
Stream<Integer> p1 = collection.stream().parallel();
Stream<Integer> p2 = collection.parallelStream();
```

**NOTE:** The Stream interface includes a method isParallel() that can be used to test whether the instance of a stream supports parallel processing. Some operations on streams preserve the parallel attribute, while others do not.

```
10: long start = System.currentTimeMillis();
11: List.of(1, 2, 3, 4, 5)
12: .stream()
13: .map(w -> doWork(w))
14: .forEach(s -> System.out.print(s + " "));
15:
16: System.out.println();
17: var timeTaken = (System.currentTimeMillis()-start)/1000;
18: System.out.println("Time: " + timeTaken + " seconds");

// 1 2 3 4 5
Time: 25 seconds

If we replace line 12 with one that uses
a parallelStream()

3 2 1 5 4
Time: 5 seconds
```

**NOTE:** If your stream operation needs to guarantee ordering and you’re not sure if it is serial or parallel, you can replace line 14 with one that uses forEachOrdered():

```
14 : .forEachOrdered(s -> System.out.print(s + " "));
```

**NOTE:** While we’ve lost some of the performance gains of using a parallel stream, our map() operation can still take advantage of the parallel stream.

**NOTE:** Since order is not guaranteed with parallel streams, methods such as findAny() on parallel streams may result in unexpected behavior. 
```
System.out.print(List.of(1, 2, 3, 4, 5, 6)
.parallelStream()
.findAny()
.get());
```
![[Pasted image 20260703002302.png]]
![[Pasted image 20260703002356.png]]

## Combining Results with reduce()

**NOTE:** The Two Golden Rules of `reduce()`

When you use `parallelStream()`, Java splits your collection into multiple smaller chunks, processes them on different threads simultaneously, and then combines the results. For this to yield a predictable and correct result, your reduction operation must guarantee two things:

- **Associativity:** Grouping must not matter. The equation `(A op B) op C` must equal `A op (B op C)`.
    
- **Identity:** The starting value (the identity) must not change the result of the operation. The equation `Identity op A` must equal `A`.

```
System.out.println(List.of('w', 'o', 'l', 'f')
.parallelStream()
.reduce("" ,
   (s1, c) -> s1 + c, // "" + w = w
   (s2, s3) -> s2 + s3)); // wolf  // Associativity w + (o + l) = (w + o) + l 
   
   
System.out.println(List.of(1, 2, 3, 4, 5, 6)
.parallelStream()
.reduce(0, (a, b) -> (a - b))); // PROBLEMATIC ACCUMULATOR

// Not identity 0 - 1 != 1 
// Not Associativity 2 - (3 - 5) != (2 - 3) - 5 // 4 != -6


System.out.println(List.of("w","o","l","f")
.parallelStream()
.reduce("X", String::concat)); // XwXoXlXf

// Not identity 
X + w != w
```


## Performing a Parallel Reduction on a Collector

**NOTE:** Requirements for Parallel Reduction with collect()

- The stream is parallel.
- The parameter of the collect() operation has the
  Characteristics.CONCURRENT characteristic.
- Either the stream is unordered or the collector has the characteristic Characteristics.UNORDERED.

**NOTE:** The Collectors class includes two sets of static methods for retrieving collectors, toConcurrentMap() and groupingByConcurrent(), both of which are UNORDERED and CONCURRENT. These methods produce Collector instances capable of performing parallel reductions efficiently. Like their
nonconcurrent counterparts, there are overloaded versions that take additional arguments.

## Avoiding Stateful Streams

```
public List<Integer> addValues(IntStream source) {
   var data = Collections.synchronizedList(new
   ArrayList<Integer>());
   source
      .filter(s -> s % 2 == 0)
      .forEach(i -> { data.add(i); }); 
      // STATEFUL: DON'T DO THIS!
   return data;
}


// Let’s say this method is executed with a serial stream:

var list = addValues(IntStream.range(1, 11));
System.out.print(list); // [2, 4, 6, 8, 10]

var list = addValues(IntStream.range(1, 11).parallel());
System.out.print(list); // [6, 8, 10, 2, 4]


// FIX

public List<Integer> addValuesBetter(IntStream source) {
return source.filter(s -> s % 2 == 0)
.boxed()
.collect(Collectors.toList());
}


// It produces the same ordered result on both serial and parallel streams.
```