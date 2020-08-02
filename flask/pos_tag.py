import spacy
import en_core_web_sm
from nltk import sent_tokenize
from flask import jsonify
import nltk
from nltk.tokenize import RegexpTokenizer
nltk.download('punkt')

class my_dictionary(dict): 
  
    # __init__ function 
    def __init__(self): 
        self = dict() 
          
    # Function to add key:value 
    def add(self, key, value): 
        self[key] = value 

class pos(my_dictionary):
    def __init__(self):
        super().__init__()
        self.nlp = en_core_web_sm.load()
        print("NLP model Loaded")

    def result(self,text):
        sentences = sent_tokenize(text)
        dict_obj = my_dictionary() 

        images = []
        for i in sentences:
            doc = self.nlp(i)
            result = []
            for token in doc:
                if(token.pos_=='NOUN'):
                    result.append(token.text)
            images.append(result)

        '''Generating Subtitle'''
        sentences = sent_tokenize(text)
        tokenizer = RegexpTokenizer(r'\w+')
        
        # Sentences 
        new_sentences=[]
        for text in sentences:
            text = text.lower()
            text = tokenizer.tokenize(text)
            text = ' '.join(text)
            new_sentences.append(text)

        # words
        new_images=[]
        for image_list in images:
            img=[]
            for i in image_list:
                img.append(i.lower())
            new_images.append(img)   


        '''Subtitle''' 

        for k in range(len(new_sentences)):
            
            new_text = new_sentences[k].split()
            cnt=0
            
            for i in range(len(new_images[k])):

                subtitle=[]

                for j in range(cnt,len(new_text)):

                    if(new_images[k][i] != new_text[j]):
                        subtitle.append(new_text[j])

                    elif(new_images[k][i] == new_text[j]):
                        subtitle.append(new_text[j])
                        ans = ' '.join(subtitle)
                        cnt=j+1

                        dict_obj.add(ans,new_images[k][i])
        return dict_obj

# Initialize the class object 
pos_obj = pos()