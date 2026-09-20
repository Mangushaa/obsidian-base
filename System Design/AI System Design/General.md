
![[Pasted image 20260909233258.png]]

Tools that use AI can become worse without single line of code change due to data that was used to train model becomes not relevant, such SW result becomes worse.


# The Three Question Families

### Family 1: Predictive ML Systems

**The model predicts a score, and the system acts on that score.** Will this user click this video? Is this transaction fraudulent? How many minutes will this delivery take?

The output is always a number or a label. A label is a category the model assigns, like fraud or not-fraud. A model trained on your own historical data usually produces it in a few milliseconds.

**Common questions:** recommendation systems, feed ranking, search ranking, ad targeting, fraud and spam detection, ETA prediction, churn prediction.


### Family 2: Generative Systems

**The model produces content.** That content might be an answer, a summary, code, or an image.

### Family 3: Agentic Systems

**The model decides and acts.** It plans steps. It calls tools such as search, databases, APIs, and code execution. It observes what comes back and repeats until the task is done.

# A Framework for AI Design Answers