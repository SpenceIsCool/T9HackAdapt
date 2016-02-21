def bar (x)
	if x == 0:
		return 0
	elif x == 1:
		return 1
	else
		return bar(x-1) + bar(x-2) 

print bar(3)

print bar(0)


print bar(10)
