import { problemWithServiceController } from '~/src/server/check-plant-health-information-and-import-rules/problem-with-service/controller.js';
import Hapi from '@hapi/hapi';



  describe('problemWithServiceController', () => {
    let request, h,server;
  
    beforeEach(() => {
      request = {
        query: {},
        yar: {
          set: jest.fn(),
          get: jest.fn()
        }
      };
      h = {
        view: jest.fn().mockReturnValue({
          code: jest.fn()
        })
      };
    
    });
   
  
    it('should handle valid staus code', async () => {
      request.query.statusCode = 404;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 404, 
           message: "Page not found", 
           pageTitle: "Error: Page not found — Check plant health information and import rules — GOV.UK",
            statusCode: 404
            
        
      }));
    });


    it('should handle valid staus code', async () => {
      request.query.statusCode = 403;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 403, 
           message: "Forbidden", 
           pageTitle: "Error: Check plant health information and import rules — GOV.UK",
            statusCode: 403
            
        
      }));
    });
    it('should handle valid staus code', async () => {
      request.query.statusCode = 401;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 401, 
           message: "Unauthorized", 
           pageTitle: "Error: Check plant health information and import rules — GOV.UK",
            statusCode: 401
            
        
      }));
    });
    it('should handle valid staus code', async () => {
      request.query.statusCode = 400;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 400, 
           message: "Bad Request", 
           pageTitle: "Error: Check plant health information and import rules — GOV.UK",
            statusCode: 400
            
        
      }));
    });
    it('should handle valid staus code', async () => {
      request.query.statusCode = 500;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 500, 
           message: "Something went wrong", 
           pageTitle: 'Error: Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK',
            statusCode: 500
            
        
      }));
    });

    it('should handle valid staus code', async () => {
      request.query.statusCode = 502;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 502, 
           message: "Something went wrong", 
           pageTitle: 'Error: Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK',
            statusCode: 502
            
        
      }));
    });
    it('should handle valid staus code', async () => {
      request.query.statusCode = 503;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 503, 
           message: "Something went wrong", 
           pageTitle: 'Error: Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK',
            statusCode: 503
            
        
      }));
    });
    it('should handle valid staus code', async () => {
      request.query.statusCode = 504;
      
  
       await problemWithServiceController.handler(request, h);
  
     
      expect(h.view).toHaveBeenCalledWith('check-plant-health-information-and-import-rules/problem-with-service/index', expect.objectContaining({
      
           heading: 504, 
           message: "Something went wrong", 
           pageTitle: 'Error: Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK',
            statusCode: 504
            
        
      }));
    });
});
