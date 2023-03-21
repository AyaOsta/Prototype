#!/usr/bin/env python
# coding: utf-8

# In[87]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer

import string
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer #

from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, accuracy_score, precision_score, recall_score, f1_score

# Model training/testing 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

#neural network
from keras.preprocessing.text import Tokenizer


# In[88]:


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
df


# In[89]:


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


# In[90]:


# df['Cleaned_0'] = df['3. What made you choose this major?'].apply(clean)
df['What did you like the most about your major?'] = df['What did you like the most about your major?'].apply(clean)
df['1. What was your major of choice during your Bachelor\'s ?'] = df['1. What was your major of choice during your Bachelor\'s ?'].str.lower()
df['1. What was your major of choice during your Bachelor\'s ?'] = df['1. What was your major of choice during your Bachelor\'s ?'].str.strip()


# In[91]:


df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'mba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'emba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'enba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'global mba'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'aa'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'matlem'].index, inplace=True)
df.drop(df.loc[df['1. What was your major of choice during your Bachelor\'s ?']== 'executive mba'].index, inplace=True)
df['1. What was your major of choice during your Bachelor\'s ?'].values


# In[92]:


df


# In[93]:


df =df.iloc[:,2:9]
df


# In[94]:


df


# In[95]:


majors_pd = pd.read_csv('Majors.csv')
majors_df = df.iloc[:,0]
key = majors_pd.iloc[:,1]
majors_df


# In[96]:


for i in majors_df:
  # print(i)
  l = majors_pd[majors_pd['Majors']== i].index.tolist()
  p = df[df['1. What was your major of choice during your Bachelor\'s ?']== i].index.tolist()
  df.loc[p,'New_Majors_Category'] = key._get_value(l[0])
  # print(l , p)


# In[97]:


df['New_Majors_Category'] = df['New_Majors_Category'].astype(int)
df


# In[98]:


X = df.iloc[:, 1:6]
X


# In[99]:


y = df.iloc[:,7]
y


# In[100]:


from sklearn.preprocessing import OneHotEncoder

ohe = OneHotEncoder(handle_unknown='ignore',sparse=False)

X = pd.DataFrame(ohe.fit_transform(X))

X


# In[101]:


from sklearn.naive_bayes import MultinomialNB

X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.05, random_state=123)

model = MultinomialNB()
model.fit(X_train, y_train)

model.score(X_test, y_test)


# In[102]:


from sklearn.model_selection import GridSearchCV
from sklearn.neighbors import KNeighborsClassifier

#List Hyperparameters that we want to tune.
leaf_size = list(range(1,50))
n_neighbors = list(range(1,30))
p=[1,2]
#Convert to dictionary
hyperparameters = dict(leaf_size=leaf_size, n_neighbors=n_neighbors, p=p)
#Create new KNN object
knn_2 = KNeighborsClassifier()
#Use GridSearch
clf = GridSearchCV(knn_2, hyperparameters, cv=10)
#Fit the model
best_model = clf.fit(X_train,y_train)


# In[110]:


X_train


# In[109]:


X_test


# In[103]:


y_pred = clf.predict(X_test)


# In[104]:


from sklearn.metrics import accuracy_score

accuracy_score(y_pred,y_test)


# In[105]:


from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(n_neighbors=1)
knn.fit(X_train, y_train)


# In[106]:


y_pred1 = knn.predict(X_test)
y_pred1


# In[107]:


from sklearn.metrics import accuracy_score

accuracy_score(y_pred1,y_test)


# In[114]:


sample_dataset = [['No','Interest in the major', 'I like problem solving', 'Yes', 'Yes']]


knn.predict(ohe.transform(sample_dataset))

