import pickle

model = pickle.load(open('model.pickle', 'rb'))
ohe = pickle.load(open('ohe.pickle', 'rb'))
pr = pickle.load(open('print.pickle', 'rb'))
sample_dataset = [['Interest in the major', 'biology premed', 'Yes', 'Yes']]
major = model.predict(ohe.transform(sample_dataset))
print(major)
major_name = pr(major[0])
print(major_name)

