from random import choice
from enum import Enum


class GameOption(Enum):
    """
    Define game options as an Enum
    """
    ROCK = "rock"
    PAPER = "paper"
    SCISSORS = "scissors"


def play_game(user_choice: GameOption, computer_choice: GameOption) -> None:
    """
    Plays a round of rock, paper, scissors.
    """
    # Determine winner
    if user_choice == computer_choice:
        print("It's a tie! You both chose", user_choice.value)
    elif user_choice == GameOption.ROCK:
        if computer_choice == GameOption.SCISSORS:
            print("Rock smashes scissors! You win!")
        else:
            print("Paper covers rock! You lose.")
    elif user_choice == GameOption.PAPER:
        if computer_choice == GameOption.ROCK:
            print("Paper covers rock! You win!")
        else:
            print("Scissors cuts paper! You lose.")


def get_user_choice() -> GameOption:
    """
    Prompts the user for their choice and validates it.
    """
    while True:
        user_input = input("Enter your choice (rock, paper, scissors): ").lower()
        try:
            return GameOption(user_input)
        except ValueError:
            print("Invalid choice. Please choose rock, paper, or scissors.")


def main() -> None:
    """
    The main function that runs the rock, paper, scissors game.
    """
    user_choice = get_user_choice()
    computer_choice = choice(list(GameOption))
    play_game(user_choice, computer_choice)


if __name__ == "__main__":
    main()
