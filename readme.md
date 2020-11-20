# How efficient is Morse code?

Morse code was invented by an American artist, Samuel F.B. Morse, in around 1837. As this was long before computers were available, I thought it would be interesting to see how we might solve the same problem today using modern tools.

Morse's idea for the structure of the code was that to create the shortest encoding, the frequency of occurrence of the input characters must be inversely related to the length of their output.

The first thing that we'll need then, is a mapping of letters to their frequency of occurrence. The best I could find is the [Norvig dataset](http://norvig.com/mayzner.html).

Morse code is composed of dots and dashes. A dot is called a dit and a dash is called a dah. A dah is defined as having a duration 3 times that of a dit. Each space between characters is of a duration equal to a dit. This means we can accurately assign each permutation a score. For example, "a" in Morse code is "dit dah" which gives a score of 5 (1 and 3 for the characters and 1 for the space between them).

I created a list of permutations of dit's and dah's and calculated a score for each. Each letter was then assigned a permutation by mapping the letter frequencies to the inverse of the permutation scores. For example, the most common letter is "e" and according to Norvig, occurs with a frequency of 12.49%. As this letter will be transmitted the most, it should be assigned the permutation with the lowest score, a single dit.

Once each letter has been assigned a permutation, we need to measure for a change in efficiency. We can create a score for both Morse code and the optimised code by summing the product of each letter frequency and its associated letter's permutation score.

The optimised code shows a 7.2% improvement in efficiency.

<br/>
<table>
<tr><th></th><th>Morse code</th><th>Optimised code</th></tr>
<tr><td>

| Letter | %     |
| ------ | ----- |
| e      | 12.49 |
| t      | 9.28  |
| a      | 8.04  |
| o      | 7.64  |
| i      | 7.57  |
| n      | 7.23  |
| s      | 6.51  |
| r      | 6.28  |
| h      | 5.05  |
| l      | 4.07  |
| d      | 3.82  |
| c      | 3.34  |
| u      | 2.73  |
| m      | 2.51  |
| f      | 2.4   |
| p      | 2.14  |
| g      | 1.87  |
| w      | 1.68  |
| y      | 1.66  |
| b      | 1.48  |
| v      | 1.05  |
| k      | 0.54  |
| x      | 0.23  |
| j      | 0.16  |
| q      | 0.12  |
| z      | 0.09  |

</td><td>

| Code | Score |
| ---- | ----- |
| .    | 1     |
| -    | 3     |
| .-   | 5     |
| ---  | 11    |
| ..   | 3     |
| -.   | 5     |
| ...  | 5     |
| .-.  | 7     |
| .... | 7     |
| .-.. | 9     |
| -..  | 7     |
| -.-. | 11    |
| ..-  | 7     |
| --   | 7     |
| ..-. | 9     |
| .--. | 11    |
| --.  | 9     |
| .--  | 9     |
| -.-- | 13    |
| -... | 9     |
| ...- | 9     |
| -.-  | 9     |
| -..- | 11    |
| .--- | 13    |
| --.- | 13    |
| --.. | 11    |

</td><td>

| Code  | Score |
| ----- | ----- |
| .     | 1     |
| -     | 3     |
| ..    | 3     |
| .-    | 5     |
| -.    | 5     |
| ...   | 5     |
| --    | 7     |
| ..-   | 7     |
| .-.   | 7     |
| -..   | 7     |
| ....  | 7     |
| .--   | 9     |
| -.-   | 9     |
| --.   | 9     |
| ...-  | 9     |
| ..-.  | 9     |
| .-..  | 9     |
| -...  | 9     |
| ..... | 9     |
| ---   | 11    |
| ..--  | 11    |
| .-.-  | 11    |
| .--.  | 11    |
| -..-  | 11    |
| -.-.  | 11    |
| --..  | 11    |

</td></tr> </table>

## Running the script

```
node create-code.js
```
