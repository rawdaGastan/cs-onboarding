import os 
import ini

def ini_parse(file_name):
    #get dir location
    __location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    file = open(os.path.join(__location__, file_name))

    file_lines = file.readlines()
    parsed = {}
    new_parent = False

    for line in file_lines:
        if line[0] == "[":
            parent = line[1: len(line) - 2]
            parsed[parent] = {}
            new_parent = True
        
        elif new_parent and "=" in line:
            key, val = line.split(" = ")
            val = val.replace("\n", "").replace("\r", "")
            # check if digit
            if val.isnumeric():
                val = int(val) 
            parsed[parent][key] = val

    return parsed
    

def test():
    __location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    file_name = "sample.ini"
    parsed = ini_parse(file_name)

    assert parsed["owner"]["name"] == "John", "Should be John"
    assert parsed["owner"]["organization"] == "threefold", "Should be threefold"
    assert parsed["database"]["server"] == "192.0.2.62", "Should be 192.0.2.62"
    assert parsed["database"]["port"] == 143, "Should be 143"
    assert parsed["database"]["password"] == 123456, "Should be 123456"

    #check if it is the same parsing
    parsed2 = ini.parse(open(os.path.join(__location__, file_name)).read())
    assert parsed == parsed2, "Should be identical"


if __name__ == "__main__":
    test()
    print("Everything passed")

