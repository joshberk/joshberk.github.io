
from typing import Union


def num_checker(number: int) -> Union[int, str]:
    """
    This is a function that takes in a number from 1 to 100 and categorize
    them based of the following conditions
    divisible by 3 = crackle
    divisible by 5 = Pop
    divisible by 3 and 5 = cracklePop
    """
    if number % 3 == 0:
        return "Crackle"
    elif number % 5 == 0:
        return "Pop"
    elif number % 15 == 0:
        return "cracklePop"
    else:
        return number


for x in range(1, 101):
    output = num_checker(x)
    print(output)

    
