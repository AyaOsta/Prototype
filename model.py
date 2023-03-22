import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import OneHotEncoder
from sklearn.naive_bayes import MultinomialNB
import pickle

from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, accuracy_score, precision_score, recall_score, f1_score, mean_squared_error

# Model training/testing 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

df = pd.read_csv('LastOne.csv')
df
cols = {'Timestamp', 
        '1. Would you like to take part in this study?',
        '1. What gender do you identify as?',
        '2. How old are you?',
        '4. How many languages do you speak?',
        '2. What year did you graduate from University?',
        '8. What are some of the things you wish someone had told you prior to choosing this major?',
        '2. Do you feel motivated to go to work?',
        '1. If you had the courage would you quit?',
        '2. What would make you more motivated to continue?',
        '2. What is your level of education?',
        '3. What is your nationality?',
        '5. Where do you currently live?',
        
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
df['1. What was your major of choice during your Bachelor\'s ?'].values

df = df.iloc[:,2:9]

majors_pd = pd.read_csv('Majors.csv')
majors_df = df.iloc[:,0]
key = majors_pd.iloc[:,1]

for i in majors_df:
  l = majors_pd[majors_pd['Majors']== i].index.tolist()
  p = df[df['1. What was your major of choice during your Bachelor\'s ?']== i].index.tolist()
  df.loc[p,'New_Majors_Category'] = key._get_value(l[0])

df['New_Majors_Category'] = df['New_Majors_Category'].astype(int)

X = df.iloc[:, 2:6]
y = df.iloc[:,7]

ohe = OneHotEncoder(handle_unknown='ignore',sparse=False)

X = pd.DataFrame(ohe.fit_transform(X))

X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.4, random_state=123)

model = MultinomialNB()
model.fit(X_train, y_train)

model.score(X_test, y_test)

sample_dataset = [['Interest in the major', 'biology premed', 'Yes', 'Yes']]

print(model.predict(ohe.transform(sample_dataset)))

file1 = open('ohe.pickle','wb')
pickle.dump(ohe, file1)

file = open('model.pickle','wb')
pickle.dump(model, file)

