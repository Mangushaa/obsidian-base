## AWS Key Management Service

KMS offers the following features:
- Centralized key management
- Integration with other AWS services
- Auditing capabilities and high availability
- Custom key store
- Compliance

You can use KMS to create keys in one of three ways: by using AWS KMS, by using AWS CloudHSM, or by importing your own key material.

## AWS CloudHSM

HSM - hardware security module.

Is third-party, validated FIPS 140-2, level 3 hardware
security modules in the AWS Cloud. 


Managing the security of encryption keys is often performed using a key management infrastructure (KMI). A KMI is composed of two components: the storage layer that protects the plaintext keys and the management layer that authorizes key use. A common way to protect keys in a KMI is to use a hardware security module. An HSM is a dedicated storage and data processing device that performs cryptographic operations using keys on the device. An HSM typically provides tamper evidence, or resistance, to protect keys from unauthorized use. A software-based authorization layer controls who can administer the HSM and which users or applications can use which keys in the HSM.

KMI - key management infrastructure

![[Pasted image 20260808161320.png]]

# Option 1 You Control the Encryption Method and the Entire KMI

### S3 encryption

You can encrypt data by using any encryption method you want and then upload the encrypted data using the Amazon S3 API.  After you have encrypted an object and safely stored the key in your KMI, you can upload the encrypted object to S3. Any time you retrieve that data, you’ll have to decrypt
it locally.

AWS provides an alternative to this do-it-yourself approach with the Amazon S3 encryption client, a feature of the AWS SDK that lets you supply a key from your KMI to encrypt and decrypt your data as you make calls to S3. The SDK takes your symmetric or asymmetric key as input and encrypt the object before uploading it to S3. The process is reversed when the SDK is used to retrieve an object.

## Amazon EBS

You can encrypt on 2 level

- System-Level or Block-Level: Encrpy all data is your EBS.
- Filesystem - encrypt certain dirs, etc.


# Option 2 You Control the Encryption Method, AWS Provides the KMI Storage Component, and You Provide the KMI Management Layer

This option is similar to option 1 in that you manage the encryption method, but it differs from option 1 in that the keys are stored in a CloudHSM appliance rather than in a key storage system that you manage on-premises.

![[Pasted image 20260808163518.png]]

# Option 3: AWS Controls the Encryption Method and the Entire KMI

![[Pasted image 20260808164909.png]]

## Amazon S3
![[Pasted image 20260808165029.png]]