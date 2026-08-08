Set == Colleciton

Is an porbablistic algorithm to check if element is inside huge colleciton, without scanning all collection. It can quikly said in element is definatly not in the collection, and of it's probably in set. In other words, **false negatives are impossible** (it never misses an item that was added), but it can sometimes return a **false positive** (claim an item is in the set when it isn’t, due to its probabilistic nature).
They shine in scenarios where maintaining a full list or hash set of all items would be impractical. Bloom filters use a fixed-size bit array as a kind of “signature” or **fingerprint of a set**, and they use multiple hash functions to distribute items across that fingerprint.

### Precredit

Fixed-size bit array that initially is all 0. [0,0,0,0...]
### Flow

##### Adding element
When we adding item we are running it against set of hash functions each of them calculating index in our array, and after turn all this index into 1. 

##### Check element existense
Same as with adding run agains same hash functions. 
- Any items are 0 -> item definatly not exists!
- All items are 1 -> item exists, but it could be other item

So bloom filters guruntee there will be no false negative, but false positive is possible.


## [[Resizing bloom filter array]]