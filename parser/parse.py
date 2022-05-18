import ini
import os 

#get dir location
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
file = open(os.path.join(__location__, 'sample.ini')).read()
parsed = ini.parse(file)

def test():
    assert parsed["owner"]["name"] == "John", "Should be John"
    assert parsed["owner"]["organization"] == "threefold", "Should be threefold"
    assert parsed["database"]["server"] == "192.0.2.62", "Should be 192.0.2.62"


if __name__ == "__main__":
    test()
    print("Everything passed")
