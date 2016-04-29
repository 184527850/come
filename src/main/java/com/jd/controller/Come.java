package com.jd.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.jd.model.ComeName;
import com.jd.model.Result;
import com.jd.model.ro.PageRequest;
import com.jd.service.ComeService;

@RestController
@RequestMapping(value="/message")
public class Come {
	@Autowired
	private ComeService comeService;
	@RequestMapping(value="/own/index")
	public ModelAndView index(){
		return new ModelAndView("message");	
	}
    @RequestMapping(value="/come/all")
    public Result findAll(){
    	return Result.success(comeService.findALL());	
    }
    @RequestMapping(value="/page")
    public Result findAll(PageRequest pageRequest){
    	return Result.success(comeService.findMessageToPage(pageRequest.getCurrentPage(), pageRequest.getPageSize()));	
    }
    @RequestMapping(value="/find/{id}")
    public Result fintById(@PathVariable("id")int id){
    	ComeName comeName=comeService.fintById(id);
    	if (comeName==null) {
			return Result.fale("数据不正确，请重新输入！！！");
		}else {
			return Result.success(comeName);
		}
		
    }
    @RequestMapping(value="/come/update" ,method=RequestMethod.POST)
    public Result update(ComeName comeName){
    	comeService.update(comeName);
		return Result.success(null);
    	
    }
    @RequestMapping(value="/come/add" ,method=RequestMethod.POST)
    public Result join(ComeName comeName){
    	comeService.join(comeName);
		return Result.success(null);
    	
    }
    @RequestMapping(value="/come/delete/{id}",method=RequestMethod.POST)
    public Result delete(@PathVariable("id")int id){
    	ComeName comeName=comeService.fintById(id);
    	if (comeName==null) {
    		return Result.fale("id不存在，请重新输入！！！");
		}else {
			comeService.delete(id);
			return Result.success(comeName);
		}
		
    }
}

