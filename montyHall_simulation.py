import random # to store car behind random door

iterations = 100000 # 100k iterations
carCount = 0
zonkCount = 0

for i in range(iterations):
    doors = ["Zonk","Zonk","Zonk"]
    """
    a "zonk" refers to a disappointing or undesirable prize that a contestant receives instead of a valuable one. 
    """
    doors[random.randint(0,2)] = "Car" # Put car randomly behind one of the 3 doors

    chosen_door = doors[1] # Player selects door 2

    # check if second & third door has zonk behind it
    if doors[1] == "Zonk":
        doors.pop(1)
    elif doors[2] == "Zonk":
        doors.pop(2)

    new_chosen_door = chosen_door # Player doesnt decide to switch

    if new_chosen_door == "Car":
        carCount+=1
    else:
        zonkCount+=1

print(f"Car: {carCount} = {round(carCount/iterations*100,1)}%")
print(f"Zonk: {zonkCount} = {round(zonkCount/iterations*100,1)}%")