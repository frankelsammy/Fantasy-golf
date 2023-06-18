filename = "/Users/sammyfrankel/rank.txt"

with open(filename, 'r') as file:
    line_num = 0
    for line in file:
        words = line.strip().split()
        if len(words) >= 3:
            line_num += 1
            third_word = words[2]
            print(f"{line_num}: {third_word}")
