import copy

line1 = input()
line2 = input()

line1_items = line1.split(" ")
N = int(line1_items[0])
K = int(line1_items[1])
M = int(line1_items[2])
numbers = []
for item in line2.split(" "):
    numbers.append(int(item))
numbers.sort()
numbers.reverse()


avrg_results = []
# temp_numbers = copy.deepcopy(numbers)
# temp_K = copy.deepcopy(K)
# temp_M = copy.deepcopy(M)


def get_average(items, new_average=0):
    return (sum(items) + new_average) / len(items)


tempM = 0
numbers2 = []
current_avg = 0
K_uses = 0
for i in range(len(numbers)):
    tempK = copy.deepcopy(K)
    numbers2.append(numbers.pop(0))
    tempM = len(numbers)
    remaining_m = M - tempM
    remaining_m = remaining_m - K_uses
    if(remaining_m < 0):
        continue
    if(remaining_m > K):
        numbers2[-1] = numbers2[-1] + K
        K_uses = K_uses + K
        avg = get_average(numbers2)

    elif(remaining_m <= K):
        avg = get_average(numbers2, remaining_m)
        remaining_m = 0

    if(avg > current_avg):
        current_avg = avg
    else:
        break

print(current_avg)