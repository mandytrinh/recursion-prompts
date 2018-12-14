/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
let factorial = function(n)
{
  if (n < 0) return null;
  else if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};
// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
/* STRATEGY:
1) Base case: when array is empty, return 0
2) Else: recursively return last number + all but last numbers
* Make sure to make copy of array and not mutate original
 */
let sum = function(array)
{
  if (array.length === 0) return 0;
  copyArr = array.slice(0);
  return copyArr.pop() + sum(copyArr);

  // Another way:
  // return array[array.length - 1] + sum(array.slice(0, -1));
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
/* STRATEGY:
Use a for loop to go thru each element
1) Base case: when element is a number, return total + elem
2) Else if elem is array: return running total + recursive call to arraySum
 */
let arraySum = function(array)
{
  let total = 0;
  for (let i = 0; i < array.length; i++)
  {
    if (Array.isArray(array[i]))
    {
      total = total + arraySum(array[i]);
    } else
    {
      total = total + array[i];
    }
  }
  return total;
};

// 4. Check if a number is even.
/*
Definition:
* a number is even if it is one more than an odd number
* a number is odd if it is one more than an even number
* 0 is even
* NEGATIVE numbers can be odd/even; it is symmetrical to positive #s
STRATEGY:
If number is negative, turn it positive
1) Base case #1: 0 is Even
2) Base case #2: 1 is Odd
3) Return recursively number - 2
3B)(why 2? even & oddness varies every OTHER number)
 */
let isEven = function(n)
{
  if (n < 0) n = -n;
  else if (n === 0) return true;
  else if (n === 1) return false;
  return isEven(n - 2);
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45 because 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1
// sumBelow(7); // 21 because 6 + 5 + 4 + 3 + 2 + 1
/* STRATEGY:
  1) Base case: if n is 1 or 0 then return 0
  2) if n is positive, go DOWNWARDS until hit base cases, similar to factorial 2B) return one less than n + recursively call sumBy(n - 1)
  3) if n is negative, go UPWARDS until hit 0
 */
let sumBelow = function(n)
{
  if (n === 1 || n === 0) return 0;
  if (n > 0)
  {
    return n - 1 + sumBelow(n - 1);
  } else
  {
    return n + 1 + sumBelow(n + 1);
  }
};

// 6. Get the integers within a range (x, y).
// NOTE: NON INCLUSIVE start & end
// range(2,9); // [3,4,5,6,7,8]
/* STRATEGY:
1) x will be the moving target that's changing, y is fixed 'destination'
2) same pattern in cases of both negative and positive x
3) so the 2 different case is when x is greater than or less than y
3B) range(7, 2) vs range(2, 7)
4) Case 1: x < y (e.g: range(2, 7))
4B) base case: x is one LESS than y, or x = y, return []
4C) else, COUNT UP to y
* recursively return range of x + 1,
* concat to array literal with beginning val x + 1
5) Case 2: x > y (e.g range(7, 2))
5B) base case: x is one MORE than y, or x = y, return []
5C) else, COUNT DOWN to y
* return recursively range of x - 1,
* concat to array literal w/ beginning val of x - 1
*/
let range = function(x, y)
{
  if (x < y)
  {
    if (x === (y - 1) || x === y) return [];
    else return [x + 1].concat(range(x + 1, y));
  } else
  {
    if (x === (y + 1) || x === y) return [];
    return [x - 1].concat(range(x - 1, y));
  }
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
/* STRATEGY:
1) Base case: if exponent is 0, return 1
2) if exponent is POSITIVE: count down exponent until it hits base case
return base * recursively call exponent(base, exponent - 1)
*** For optimization ***
2C) EVEN: store return val of recursively calling exponent / 2
& multiply return val by itself.
3) if exponent is NEGATIVE: pass exponent in the form of
num ^ -exp = 1 / num ^ exp
3B) remember to put negative sign in front of exp to turn exponent back to positive!
 */
let exponent = function(base, exp)
{
  if (exp === 0) return 1;
  if (exp < 0)
  {
    return 1 / exponent(base, -exp);
  }
  else if (isEven(exp)) //optimized for even exponents
  {
    result = exponent(base, exp / 2);
    return result * result;
    // Note the below works but result in more calls b/c does not store result in variable
    // return exponent(base, exp / 2) * exponent(base, exp / 2);
  } else if (!isEven(exp))
  {
    return base * exponent(base, exp - 1);
  }
};

/* 8. Determine if a number is a power of two.
i.e: 2 ^ something = number
powerOfTwo(1); // true
powerOfTwo(16); // true
powerOfTwo(10); // false

STRATEGY:
1) base case is when n is 1, return true,
2) if n is 0 or negative return false
3) recursively return the number divide by 2
*/
let powerOfTwo = function(n)
{
  if (n === 1) return true;
  else if (n < 1) return false;
  return powerOfTwo(n / 2);
};

// 9. Write a function that reverses a string.
// "abc" --> "cba"
/* STRATEGY:
  1) base case: string has 1 charac, just return the entire string
  2) else return the last charac + recursively call reverse on all but last
 */
let reverse = function(string)
{
  if (string.length === 1) return string;
  return string.slice(-1) + reverse(string.slice(0, -1));
};

/* 10. Write a function that determines if a string is a palindrome.
e.g:
odd # of characs: 'kayak' --> true
even # of characs: 'adda' --> true
STRATEGY:
1) base case: string is 1 charac left (odd) or 0 charac left (even), then return true
2) else compare the first and last character, if that's equivalent
2B) then recursively return all characters in between
3) finally return false if first & charac are not equal
*/
let palindrome = function(string)
{
  if (string.length === 1 || string.length === 0) return true;
  else if (string.slice(0, 1).toLowerCase() === string.slice(-1).toLowerCase())
  {
    return palindrome(string.slice(1, -1));
  }
  return false;
};

/* 11. Write a function that returns the remainder of x divided by y without using the
modulo (%) operator.
modulo(5,2) // 1
modulo(-5,2) // -1
modulo(17,5) // 2
modulo(22,6) // 4
STRATEGY:
* keep subtracting y until it becomes less than x, then it'll hit the main base case
* I.e: if the first number is smaller than the second, return that number
1) Base cases:
1A) y is 0, return NaN (e.g: 5 % 0 = NaN)
1B) y is negative, turn y to positive (e.g: 4 % -5 = 4)
1C) x is negative, invert x as well as the function (e.g: -4 % 5 = -4)
1D) main case: x is smaller than y, return x (e.g: 4 % 5 = 4)
2) Recursive case: return function of x subtract y, until it hits one of the base cases
*/
let modulo = function(x, y)
{
  if (y === 0) return NaN;
  if (y < 0) y = -y;
  if (x < 0) return -modulo(-x, y);
  if (x < y) return x;
  return modulo(x - y, y);
};

/* 12. Write a function that multiplies two numbers without using the * operator or
Math methods. e.g: multiply(5, 6), multiply(5, -6)
STRATEGY:
* Similar to factorial and range problems
1) Base cases:
1B) y or x is 0, return 0 (anything multiply by 0 is 0)
1C) when y is 1, return x (anything multiply by 1 is itself)
2) If y is POSITIVE, COUNT DOWN y until it hits base case
2B) recursively add x to the recursive calls of y - 1
3) If y is NEGATIVE, COUNT UP y until it hits base case
3B) recursively add NEGATIVE x to recursive calls of y + 1
3C) Why? if x is positive & y is negative, will turn x negative & get a negative answer
And if x is negative & y is negative, will turn x positive & get a positive answer
*/
let multiply = function(x, y)
{
  if (y === 0 || x === 0) return 0;
  if (y === 1) return x;
  if (y > 0)
  {
    return x + multiply(x, y - 1);
  } else if (y < 0)
  {
    return -x + multiply(x, y + 1);
  }
};

/* 13. Write a function that divides two numbers without using the / operator or
Math methods to arrive at an approximate quotient (ignore decimal endings).
E.g: divide(6, 2) or divide(-6, 2) or divide(-6, -2)
NOTE: This is INTEGER DIVISION
STRATEGY:
1) Base cases:
1B) if the divisor (y) is 0, return NaN  (e.g: 5/0)
1C) if the dividend (x) is 0, return 0 (e.g: 0/5)
1D) if the dividend is less than divisor (e.g: 1/5 ) or less than negative divisor (e.g: 1/-5 = -1/5 ), return 0
1E) if divisor - dividend is 0 then return 1 (e.g: 5/5)
2) else return 1 + recursive return of divisor - dividend
E.g:
6/2 --> 1 + ((6-2), 2) --> 1 + ((4-2),2) --> hits base case -->
return 1 + the other 2 ones earlier = 3
NOTE: test cases do not account for evenly divided answers for negatives
(-6 / 2) since that is much more difficult
*/
let divide = function(x, y)
{
  if (y === 0) return NaN;
  if (x - y === 0) return 1;
  if (x === 0 || x < -y || x < y) return 0;
  if (x > 0)
  {
    return 1 + divide(x - y, y);
  } else
  {
    return -1 + divide(x + y, y);
  }
};

/* 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
integers is the greatest integer that divides both x and y with no remainder.
gcd(4,36); // 4

* NOTE: the test cases here returns null for negative numbers
* Use Euclidean Algorithm: https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm

STRATEGY:
1) Base cases: if either x or y is 0, return the other number
1B) return null if x or y is negative
(only b/c those are test cases; IRL, GCD for negative numbers is always positive)
2) Get the remainder of x / y
2B) y is now x, & remainder is now y. Recursively call function on y and remainder
*/
let gcd = function(x, y)
{
  if (x === 0) return y;
  if (y === 0) return x;
  if (x < 0 || y < 0) return null;
  let remainder = x % y;
  return gcd(y, remainder);
};

/* 15. Write a function that compares each character of two strings and returns true if
both are identical.
compareStr('house', 'houses') // false
compareStr('tomato', 'tomato') // true
STRATEGY: similar to palindrome problem
1) Base case: both strings are empty, then return true
2) if first charac of each is equal, then recursively compare the rest
3) otherwise return false
*/
let compareStr = function(str1, str2)
{
  if (str1 === "" && str2 === "") return true;
  if (str1.slice(0, 1) === str2.slice(0, 1))
  {
    return compareStr(str1.slice(1), str2.slice(1));
  }
  return false;
};

/* 16. Write a function that accepts a string and creates an array where each letter
occupies an index of the array.
* Works similar to split on empty string ""
* createArray('hologram')).to.eql(['h','o','l','o','g','r','a','m'])
STRATEGY:
1) base case: if string is empty return empty array
2) return the first charac of string in array literal, concat to recursive calls
to all but first charac of string
*/
let createArray = function(str)
{
  if (str === "") return [];
  return [str.slice(0, 1)].concat(createArray(str.slice(1)));
};

/* 17. Reverse the order of an array
STRATEGY:
1) base case: if array is empty, then return []
2) else make copy of array, pop off the last elem in copy,
concat it to the recursive call of the function on all but last elements in the arr
*/
let reverseArr = function(array)
{
  if (array.length === 0) return [];
  let copyArr = array.slice(0);
  return [copyArr.pop()].concat(reverseArr(copyArr));
};

/* 18. Create a new array with a given value and length.
buildList(0,5) // [0,0,0,0,0]
buildList(7,3) // [7,7,7]

STRATEGY:
* COUNT DOWN length for each recursive call
1) Base case: if length is 0, return empty array []
2) recursively return the value in array literal, concat to
recursive calls of function, decreasing length by 1 each time
*/
let buildList = function(value, length)
{
  if (length === 0) return [];
  return [value].concat(buildList(value, length - 1));
};

/* 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
For multiples of three, output 'Fizz' instead of the number.
For multiples of five, output 'Buzz' instead of the number.
For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
fizzBuzz(5) // ['1','2','Fizz','4','Buzz']

STRATEGY: COUNT DOWN to base case of n = 0
1) Base case: when n is 0, return empty array
2) Have a variable to hold either n, or one of the fizzbuzz variations
2B) turn that elem to string, add it to array literal, and concat to recursive calls
of fizzBuzz, decreasing n by 1 each time.
* NOTE: the order of concat is important; it's different from prev examples!
* Why? To prevent array from printing out in reverse!
*/
let fizzBuzz = function(n)
{
  let elem = n;
  if (n === 0) return [];
  else if (n % 3 === 0 && n % 5 === 0) elem = "FizzBuzz";
  else if (n % 3 === 0) elem = "Fizz";
  else if (n % 5 === 0) elem = "Buzz";
  return fizzBuzz(n - 1).concat([elem.toString()]);
};

/*
20. Count the occurence of a value in a list.
countOccurrence([2,7,4,4,1,4], 4) // 3
countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
STRATEGY:
1) Base case: if the array is empty then return 0
2) if the first value of array is equal to target, return
 1 plus recursively result of calling the function on all but first element
2B) else return recursive result of calling the function on all but first element
*/
let countOccurrence = function(array, value)
{
  if (array.length === 0) return 0;
  if (array[0] === value)
  {
    return 1 + countOccurrence(array.slice(1), value);
  } else
  {
    return countOccurrence(array.slice(1), value);
  }
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
let rMap = function(array, callback) {
};

// 22. Write a function that counts the number of times a key occurs in an object.
// let obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
let countKeysInObj = function(obj, key) {
};

// 23. Write a function that counts the number of times a value occurs in an object.
// let obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
let countValuesInObj = function(obj, value) {
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
let replaceKeysInObj = function(obj, oldKey, newKey) {
};

/* 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
number is the sum of the previous two.
Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
fibonacci(5); // [0,1,1,2,3,5]

STRATEGY:
1) Base case: if number is 1 or 2 return its corresponding array from [0] to [0, 1, 1]
* Use slice, & make ending number + 1 to account for zero indexing
2) Recursively return the function on n - 1. 
When it hits base case, it will percolate up the stack 
Get the sum of the last & second to last numbers in the array
Push them into the array
Return the array
*/
let fibonacci = function(n)
{
  if (n <= 0) return null;
  if (n < 3)
  {
    return [0, 1, 1].slice(0, n + 1);
  }
  let arr = fibonacci(n - 1);
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  return arr;
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
let nthFibo = function(n)
{
  if (n < 0) return null;
  if (n <= 1) return n;
  return nthFibo(n - 1) + nthFibo(n - 2);
};

// 27. Given an array of words, return a new array containing each word capitalized.
// let words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
let capitalizeWords = function(array) {
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
let capitalizeFirst = function(array) {
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// let obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
let nestedEvenSum = function(obj) {
};

/* 30. Flatten an array containing nested arrays.
flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]

STRATEGY:
1) Base case: regular element (non-array)
2) Through a loop, check each element, if it is an array,
recursively call the function on it again.
Add it to the variable elem,
2B) use concat to merge that call and save it to result variable at the end
of each loop iteration
*/
let flatten = function(array)
{
  let result = [];
  for (let i = 0; i < array.length; i++)
  {
    let elem;
    if (Array.isArray(array[i]))
    {
      elem = flatten(array[i]);
    } else
    {
      elem = array[i];
    }
    result = result.concat(elem);
  }
  return result;
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
let letterTally = function(str, obj) {
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
let compress = function(list) {
};

// 33. Augument every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
let augmentElements = function(array, aug) {
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
let minimizeZeroes = function(array) {
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
let alternateSign = function(array) {
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
let numToText = function(str) {
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
let tagCount = function(tag, node) {
};

/* 38. Write a function for binary search.
let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
binarySearch(array, 5) // 5
https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
STRATEGY:
1) Base cases:
1A) if target is equal to element at midpoint, return midpoint
1B) if min is greater than max return null
2) Else, similar to iterative version:
* if target is less than elem at midpoint: look to the LEFT
recursively return function, passing in a new max as the midpoint - 1
* if target is more than elem at midpoint: look to the RIGHT
recursively return function, passing in a new min as the midpoint + 1

IMPORTANT CONCEPTS:
Note 1: how to find the midpoint correctly? 2 ways
1) (max - min)/2 + min
* WHY the extra + min? to offset when you're looking on the RIGHT
* E.g: from the left everything is OK with the formula (max - min) / 2
* From 0 to 5, midpoint is 2
* But from the RIGHT: 0 to 5, what is midpoint now? Still 2? No!
* Need to add the min (5) to 2, to get the correct midpoint! This is 7!!!
2) (max + min) / 2
* Same as above but is simpler

Note 2:
another way is to put the calls into the if condition. But MUST use <= or >=
if (min >= max)
{
  //recursive calls
}
return null
*/
let binarySearch = function(array, target, min, max)
{
  let copy = array.slice();
  if (min === undefined) min = 0;
  if (max === undefined) max = copy.length - 1;
  if (min > max) return null; //see note 2
  let midIndex = Math.floor(((max + min) / 2) );
  if (target === copy[midIndex]) return midIndex;
  else if (target < copy[midIndex])
  {
    return binarySearch(copy, target, min, midIndex - 1);
  } else
  {
  return binarySearch(copy, target, midIndex + 1, max);
  }
};


// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
let mergeSort = function(array) {
};

// 40. Deeply clone objects and arrays.
// let obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// let obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
let clone = function(input) {
};
