

# ICF Linked to Withdrawals


PSS - EP7GN??
PPS - Fee Report. Posting logic resolved based on FEE_TYPE (SETTLED, REVERSED) and D/C Indicator. 


# ICF Linked To Disputes

**QUESTION - should we persist this fee in fee table or dispute table??**

PSS - EP7GN ,, 
PPS - AcceptedChargeback Report from NS (uploaded by CashOps). 

#### VISA

Take value from report use currency conversion. Consider D/C indicator form file when resolving posting. (Posting Logic Same as linked to withdrawals)

#### MC

ICF not present in report. Take only ICF transaction from original transaction and post using same logic.

# ICF Not Linked to any transaction (ORPHAN)

PSS - EP7GN??
PSS - Fee Report (Existed Logic). Posting logic resolve same as for linked to withdrawal.



# General question

What's diffirence between REVERSED fees, and Chargeback Fees?

Currently reversed fee's not posted at all, only 7 transaction from 10k match to original transaction by ARN (ENIT, ENPT)


Reversed fees posted with reversed settlement settlement 




# Questions

- For accepted chargebacks report posting logic for ICF and DCC/DAF is different, how it should be handled for now?
	- For now it should be same as ICF for VISA and MC
	
-  Accepted — Fee: ICF (Mastercard & legacy Visa)  VS Accepted — Fee: ICF (Visa, D/C-indicator driven)
	- Same €0.90 test on a Visa chargeback using the legacy fixed-direction table — use only as the pre-`CCM-4054` baseline to diff against once D/C-indicator logic is live.?????? It it's related why posting logic diffirent?
	- It's not related 
- Accepted — Fee: ICF (Visa, D/C-indicator driven)
	- ICF — cancellation/reversal - Reverses whatever the original entry was (example is wrong?) Looks like yes.
	- How reversed ICFs are posted to netsuite?? 




# ARNS where reversed has access to withdrawal

486184817340008, 486187812896324, 486190811252093, 486196803948155, 586203101589414, 486207773743302, 486213786573859


If Reversed ICFs should be linked to withdrawal? Currently 7 possible transactions out of 10k is in db.




# Question to EDUARD why do we need this lock?