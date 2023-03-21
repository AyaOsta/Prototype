import pickle

from major_ml import ohe, knn

file = open('ohe.pickle', 'wb')
pickle.dump(ohe, file)
file.close()

file = open('ml.pickle', 'wb')
pickle.dump(knn, file)
file.close()
