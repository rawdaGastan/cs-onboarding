import ini
import os 

#get dir location
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

config = ini.parse(open(os.path.join(__location__, 'sample.ini')).read())

config['scope'] = 'local'
config['database']['database'] = 'use_another_database'
config['paths']['default']['tmpdir'] = '/tmp'
del config['paths']['default']['datadir']
config['paths']['default']['array'].append('fourth value')

with open(os.path.join(__location__, 'sample_modified.ini'), 'w+') as f:
    f.write(ini.stringify(config, {'section': 'section'}))