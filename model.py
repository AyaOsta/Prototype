import pandas as pd
import matplotlib.pyplot as plt
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import OneHotEncoder
from sklearn.naive_bayes import MultinomialNB
from sklearn.neighbors import KNeighborsClassifier
import pickle

from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, accuracy_score, precision_score, recall_score, f1_score, mean_squared_error
from sklearn.metrics import accuracy_score

# Model training/testing 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

df = pd.read_csv('SecondOne.csv')
df
cols = {'Timestamp', 
        '1. Would you like to take part in this study?',
        '1. What gender do you identify as?',
        '2. How old are you?',
        '4. How many languages do you speak?',
        '2. What year did you graduate from University?',
        '8. What are some of the things you wish someone had told you prior to choosing this major?',
        '2. What would make you more motivated to continue?',
        '2. What is your level of education?',
        '3. What is your nationality?',
        '5. Where do you currently live?',
        '6. If you had to make another major choice what would it be?',
        '7. Would you advise others to make the same choice?',
        '1. Are you satisfied with your job?',
        '5. Did you graduate ?',
        '6. What University did you attend?',
        # 'Did you change your major during the course of your studies?'
       }
df = df.drop(cols, axis = 1)
df = df.dropna()

en_stopwords = stopwords.words("english")
lemma = WordNetLemmatizer()
ps = PorterStemmer()
#define a function for preprocessing
def clean(text):
    text = re.sub("[^A-Za-z1-9 ]", "", text) #removes punctuation marks
    # text = text.lower() #changes to lower case
    tokens = word_tokenize(text) #tokenize the text
    clean_list = [] 
    for token in tokens:
        if token not in en_stopwords: #removes stopwords
            clean_list.append(lemma.lemmatize(token)) #lemmatizing and appends to clean_list
    return " ".join(clean_list)# joins the tokens


def clean1(text):
    text =re.sub('/', '-'. text)
    return text


df['3. What made you choose this major?'] = df['3. What made you choose this major?'].apply(clean)
df['What did you like the most about your major?'] = df['What did you like the most about your major?'].apply(clean)
df['1. What was your major of choice during your Bachelor\'s ?'] = df['1. What was your major of choice during your Bachelor\'s ?'].str.lower()
df['1. What was your major of choice during your Bachelor\'s ?'] = df['1. What was your major of choice during your Bachelor\'s ?'].str.strip()

df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'mba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'emba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'enba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'global mba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'aa'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'matlem'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'executive mba'].index, inplace=True)
# df['1. What was your major of choice during your Bachelor\'s ?'].values

# df = df.iloc[:,2:9]

majors_pd = pd.read_csv('Majors.csv')
majors_df = df.iloc[:,0]
key = majors_pd.iloc[:,1]

for i in majors_df:
  l = majors_pd[majors_pd['Majors']== i].index.tolist()
  p = df[df['1. What was your major of choice during your Bachelor\'s ?']== i].index.tolist()
  df.loc[p,'New_Majors_Category'] = key._get_value(l[0])

df['New_Majors_Category'] = df['New_Majors_Category'].astype(int)

X = df.iloc[:, 2:6]
y = df.iloc[:,9]

ohe = OneHotEncoder(handle_unknown='ignore',sparse=False)

X = pd.DataFrame(ohe.fit_transform(X))

X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.4, random_state=123)

# model = MultinomialNB()
# model.fit(X_train, y_train)

# model.score(X_test, y_test)

knn = KNeighborsClassifier(n_neighbors=3, p=5, metric='minkowski')
knn.fit(X_train, y_train)

y_pred1 = knn.predict(X_test)
y_pred1

accuracy_score(y_pred1,y_test)

sample_dataset = [['Pressure', 'I like problem solving and working with circuits', 'No', 'Yes']]

outcome = knn.predict(ohe.transform(sample_dataset))
# print(outcome)

def printingoutcome(outcome):
    for i in majors_pd:
        l = majors_pd[majors_pd['Category']== outcome[0]].index.tolist()
        major = majors_pd.iloc[:,0]
        o = major.loc[l[0]]
    print(o)

# printingoutcome(outcome)

file1 = open('ohe.pickle','wb')
pickle.dump(ohe, file1)

file = open('model.pickle','wb')
pickle.dump(knn, file)

file = open('print.pickle','wb')
pickle.dump(printingoutcome(outcome), file)

printingoutcome(knn.predict(ohe.transform(sample_dataset)))

