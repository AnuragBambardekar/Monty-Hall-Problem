import random

def monty_hall_simulation(num_simulations):
    stick_wins = 0
    switch_wins = 0

    for _ in range(num_simulations):
        doors = {1: 'goat', 2: 'goat', 3: 'car'}

        # Randomly select a door for the player's initial choice
        player_choice = random.randint(1, 3)
        print(player_choice)

        # The host will open a door with a goat behind it that is not the player's choice
        remaining_doors = [door for door in doors if door != player_choice]
        print(remaining_doors)
        door_to_open = random.choice([door for door in remaining_doors if doors[door] == 'goat'])
        print(door_to_open)

        # The player's new choice, if they switch, is the other unopened door
        new_choice = [door for door in doors if door not in [player_choice, door_to_open]][0]

        # Check if the player wins when sticking with the initial choice
        if doors[player_choice] == 'car':
            stick_wins += 1

        # Check if the player wins when switching doors
        if doors[new_choice] == 'car':
            switch_wins += 1

    # Calculate the probabilities of winning when sticking and when switching
    stick_prob = stick_wins / num_simulations
    switch_prob = switch_wins / num_simulations

    return stick_prob, switch_prob

if __name__ == "__main__":
    num_simulations = 10000
    stick_prob, switch_prob = monty_hall_simulation(num_simulations)

    print(f"Probability of winning by sticking: {stick_prob:.2%}")
    print(f"Probability of winning by switching: {switch_prob:.2%}")



