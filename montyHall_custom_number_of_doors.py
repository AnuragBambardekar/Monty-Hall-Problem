import random

def monty_hall_simulation(num_simulations, num_doors):
    # Initialize variables to count wins when sticking and wins when switching
    stick_wins = 0
    switch_wins = 0

    for _ in range(num_simulations):
        # Create a list representing the doors, with one car and the rest goats
        doors = ['goat'] * num_doors
        car_position = random.randint(0, num_doors - 1)
        doors[car_position] = 'car'

        # Randomly select a door for the player's initial choice
        player_choice = random.randint(0, num_doors - 1)

        # The host will open (num_doors - 2) doors with goats that the player didn't choose
        remaining_goat_doors = [i for i, door in enumerate(doors) if door == 'goat' and i != player_choice]
        host_opened = random.sample(remaining_goat_doors, num_doors - 2)

        # Determine the remaining unopened door if the player switches
        remaining_doors = [i for i in range(num_doors) if i != player_choice and i not in host_opened]
        switch_choice = remaining_doors[0]

        # Check if the player wins when sticking with the initial choice
        if doors[player_choice] == 'car':
            stick_wins += 1

        # Check if the player wins when switching doors
        if doors[switch_choice] == 'car':
            switch_wins += 1

    # Calculate the probabilities of winning when sticking and when switching
    stick_prob = stick_wins / num_simulations
    switch_prob = switch_wins / num_simulations

    return stick_prob, switch_prob

if __name__ == "__main__":
    num_simulations = 10000
    num_doors = int(input("Enter the number of doors: "))
    
    stick_prob, switch_prob = monty_hall_simulation(num_simulations, num_doors)

    print(f"Probability of winning by sticking: {stick_prob:.2%}")
    print(f"Probability of winning by switching: {switch_prob:.2%}")
